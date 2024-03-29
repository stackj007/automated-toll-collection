import express from 'express'
import { Request, Response } from 'express'
import session from 'express-session'
import cors from 'cors'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import passport from './src/passport'
import {User} from "./src/entity/User";
import {AppDataSource} from "./src/data-source";
require('dotenv').config()

bodyParser.urlencoded({ extended: false })

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
const sessionMiddleware = session({
  secret: 'cats',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
})
app.use(sessionMiddleware)
app.use(passport.authenticate('session'))
app.use(passport.initialize())
app.use(passport.session())
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  })
)

passport.serializeUser((user: User, done) => {
  AppDataSource.getRepository(User).findOneBy({id: user.id}).then((user) => {
    done(null, user);
  });
});

passport.deserializeUser((user: User, done) => {
  AppDataSource.getRepository(User).findOneBy({id: user.id}).then((user) => {
    done(null, user);
  });
});


function isUserLoggedIn(
  req: Request,
  res: Response,
  next: any
) {
  req.user !== null ? next() : res.sendStatus(401)
}

function isAdmin(req: Request, res: Response, next: any) {
  // @ts-ignore
  req.user?.isAdmin ? next() : res.sendStatus(401)
}

app.get("/", (req, res) => res.send("Express on Vercel"));

app.post('/api/register', async (req, res) => {
  if (req.isAuthenticated()) {
    return res
      .status(403)
      .json({ error: 'Already logged in' })
  }

  const { email, password, confirmPassword, name } = req.body

  if (!email && !password && !confirmPassword && name) {
    return res
      .status(403)
      .json({ error: 'All Fields are required' })
  }

  if (confirmPassword !== password) {
    return res
      .status(403)
      .json({ error: 'Password do not match' })
  }
  try {
    const existingUser = await AppDataSource.getRepository(
      User
    ).findOneBy({ email })
    if (existingUser) {
      return res
        .status(409)
        .json({ error: 'Email already exists' })
    }

    const salt = await bcrypt.genSalt(15)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = AppDataSource.getRepository(User).create({
      email: req.body.email,
      password: hashedPassword,
      name
    })
    await AppDataSource.getRepository(User).save(user)

    delete user.password
    return res
      .status(200)
      .json({ message: 'Registration successful', user })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

app.post('/api/login',
  passport.authenticate('local', {
    failureMessage: 'failed',
  }),
  function (req, res) {
    res.json({ message: 'Logged in', user: req.user })
  }
)

app.post('/api/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.json({ message: 'Logged out' })
  })
})

app.get('/api/user',
  async function (req: Request, res: Response) {
    if (req.user) {
      // @ts-ignore
      delete req.user.password
      res.json({ user: req.user })
    } else {
      res.status(403).json({ error: 'Not logged in' })
    }
  }
)

app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await AppDataSource.getRepository(
      User
    ).find()

    users.forEach((user) => delete user.password)
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.post('/api/delete-user', isAdmin, async (req, res) => {
  const {id} = req.body

  try {
    await AppDataSource.getRepository(User).delete(id)
    res.json({message: "User deleted"})
  } catch (e) {
    console.error(e.message)
    res.status(400).json({message: "Error delete the user"})
  }
});

app.post('/api/edit-user', isAdmin, async (req, res) => {
  const {id, name, email} = req.body

  try {
    const user = await AppDataSource.getRepository(User).findOneBy({id})

    if (!user) {
      res.status(404).json({message: "user doesn't not exist"})
    }

    user.name = name
    user.email = email

    await AppDataSource.getRepository(User).save(user)
    res.json({message: "User deleted"})
  } catch (e) {
    console.error(e.message)
    res.status(400).json({message: "Error delete the user"})
  }
});

const port = process.env.PORT || 8000

AppDataSource.initialize()
  .then(() => {
    console.log('Database is connected')
    const server = app.listen(port)
    module.exports = app;
  })
  .catch((error) => {
    console.log('Error: ', error)
  })

