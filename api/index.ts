import express from 'express'
import { Request, Response } from 'express'
import session from 'express-session'
import cors from 'cors'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import passport from './src/passport'
import {User} from "./src/entity/User";
import {AppDataSource} from "./src/data-source";
import 'dotenv/config'
import {UTApi} from "uploadthing/server";
import {UserVehicleRequest} from "./src/entity/UserVehicleRequest";
import fileUpload, {UploadedFile} from "express-fileupload";
import {TypeormStore} from "connect-typeorm";
import {Session} from "./src/entity/Session";

const utApi = new UTApi()

bodyParser.urlencoded({ extended: false })
const sessionRepository = AppDataSource.getRepository(Session);

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
const sessionMiddleware = session({
  secret: 'cats',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
    store: new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false, // If using MariaDB.
        ttl: 86400
    }).connect(sessionRepository)
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
app.use(fileUpload({
  limits: { fileSize: 24 * 1024 * 1024 },
}));

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

app.post('/api/user-request', isUserLoggedIn, async (req, res) => {
  // const [idFront, idBack, drivingLicenseFront, drivingLicenseBack, rcBook, vehiclePhoto, vehicleNumber] =
  const {vehicleNumber} = req.body
  if (!vehicleNumber) {
    return res.status(400).json({message: "vehicle number is required"})
  }

  if (!req?.files || Object.keys(req?.files).length !== 6) {
    return res.status(400).send('All files are required');
  }

  const {idFront, idBack, drivingLicenseFront, drivingLicenseBack, rcBook, vehiclePhoto} = req.files as { [key: string]: UploadedFile }

  // @ts-ignore
  const uploadedResults: Array<{data: {url: string}, error: string|null }> = await utApi.uploadFiles([
    // @ts-ignore
    new File([idFront.data], idFront.name), // @ts-ignore
    new File([idBack.data], idBack.name),// @ts-ignore
    new File([drivingLicenseFront.data], drivingLicenseFront.name), // @ts-ignore
    new File([drivingLicenseBack.data], drivingLicenseBack.name), // @ts-ignore
    new File([rcBook.data], rcBook.name), // @ts-ignore
    new File([vehiclePhoto.data], vehiclePhoto.name), // @ts-ignore
  ]);

  if (uploadedResults.filter((result) => result.error).length > 0) {
    return res.status(500).json({message: "Error uploading files, please try again"})
  }

  const urls = uploadedResults.map((result) => result.data.url)
  const userVehicleRequest = AppDataSource.getRepository(UserVehicleRequest).create({
    vehicleNumber,
    idCardFrontUrl: urls[0],
    idCardBackUrl: urls[1],
    driverLicenseFrontUrl: urls[2],
    driverLicenseBackUrl: urls[3],
    vehicleRCBookUrl: urls[4],
    vehiclePhotoUrl: urls[5],
  })
  // @ts-ignore
  userVehicleRequest.user = await AppDataSource.getRepository(User).findOneByOrFail({id: req.user?.id})

  await AppDataSource.getRepository(UserVehicleRequest).save(userVehicleRequest)
  //TODO: normalize user
  res.json({message: "Request submitted successfully"})
});

app.get('/api/user-requests', isAdmin, async (req, res) => {
  try {
    const userRequests = await AppDataSource.getRepository(UserVehicleRequest).find({relations: ['user'], where: {isApproved: false}})
    res.json(userRequests)
  } catch (e) {
    console.error(e.message)
    res.status(400).json({message: "Error fetching user requests"})
  }
});

app.get('/api/approve-request', isAdmin, async (req, res) => {
    const {id} = req.query

    if (!id) {
        return res.status(400).json({message: "Request id is required"})
    }

    try {
        const userRequest = await AppDataSource.getRepository(UserVehicleRequest).findOneByOrFail({id: Number(id)})

        if (!userRequest) {
            return res.status(404).json({message: "Request not found"})
        }

        userRequest.isApproved = true
        await AppDataSource.getRepository(UserVehicleRequest).save(userRequest)

        res.json({message: "Request approved"})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({message: "Error approving request"})
    }

});

app.get('/api/reject-request', isAdmin, async (req, res) => {
    const {id} = req.query

    try {
        const userRequest = await AppDataSource.getRepository(UserVehicleRequest).findOneByOrFail({id: Number(id)})

        if (!userRequest) {
            return res.status(404).json({message: "Request not found"})
        }

        await AppDataSource.getRepository(UserVehicleRequest).delete(userRequest.id)

        res.json({message: "Request rejected"})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({message: "Error rejecting request"})
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

