import express from 'express'
import {Request, Response} from 'express'
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
import {UploadFileResult} from "uploadthing/types";
import {TollGate} from "./src/entity/TollGate";
import {Stripe} from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const utApi = new UTApi()

bodyParser.urlencoded({extended: false})
const sessionRepository = AppDataSource.getRepository(Session);

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
const sessionMiddleware = session({
  secret: 'cats',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 365},
  store: new TypeormStore({
    cleanupLimit: 2,
    limitSubquery: false,
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
  limits: {fileSize: 24 * 1024 * 1024},
}));

passport.serializeUser((user: User, done) => {
  AppDataSource.getRepository(User).findOne({where: {id: user.id}, relations: ['userVehicleRequest']}).then((user) => {
    done(null, user);
  });
});

passport.deserializeUser((user: User, done) => {
  AppDataSource.getRepository(User).findOne({where: {id: user.id}, relations: ['userVehicleRequest']}).then((user) => {
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
      .json({error: 'Already logged in'})
  }

  const {email, password, confirmPassword, name} = req.body

  if (!email && !password && !confirmPassword && name) {
    return res
      .status(403)
      .json({error: 'All Fields are required'})
  }

  if (confirmPassword !== password) {
    return res
      .status(403)
      .json({error: 'Password do not match'})
  }
  try {
    const existingUser = await AppDataSource.getRepository(
      User
    ).findOneBy({email})
    if (existingUser) {
      return res
        .status(409)
        .json({error: 'Email already exists'})
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
      .json({message: 'Registration successful', user})
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
})

app.post('/api/login',
  passport.authenticate('local', {
    failureMessage: 'failed',
  }),
  function (req, res) {
    res.json({message: 'Logged in', user: req.user})
  }
)

app.post('/api/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.json({message: 'Logged out'})
  })
})

app.get('/api/user',
  async function (req: Request, res: Response) {
    if (req.user) {
      // @ts-ignore
      delete req.user.password
      res.json({user: req.user})
    } else {
      res.status(403).json({error: 'Not logged in'})
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
    res.status(500).json({message: err.message})
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
  const {vehicleNumber} = req.body
  if (!vehicleNumber) {
    return res.status(400).json({message: "vehicle number is required"})
  }

  if (await AppDataSource.getRepository(UserVehicleRequest).findOneBy({vehicleNumber})) {
    return res.status(400).json({message: "Vehicle number already exists"})
  }

  if (!req?.files || Object.keys(req?.files).length !== 3) {
    return res.status(400).send('All files are required');
  }

  // TODO: all .jpg, .jpeg, .png
  const {id, license, rcBook} = req.files as { [key: string]: UploadedFile }

  if (!id || !license || !rcBook) {
    return res.status(400).send('All files are required');
  }

  const uploadedResults: UploadFileResult[] = await utApi.uploadFiles([
    new File([id.data], id.name),
    new File([license.data], license.name),
    new File([rcBook.data], rcBook.name),
  ]);

  if (uploadedResults.filter((result) => result.error).length > 0) {
    return res.status(500).json({message: "Error uploading files, please try again"})
  }

  const urls = uploadedResults.map((result) => result.data.url)
  const userVehicleRequest = AppDataSource.getRepository(UserVehicleRequest).create({
    vehicleNumber,
    idCardUrl: urls[0],
    driverLicenseUrl: urls[1],
    vehicleRCBookUrl: urls[2],
    user: req.user as unknown as User
  })


  await AppDataSource.getRepository(UserVehicleRequest).save(userVehicleRequest)

  res.json({message: "Request submitted successfully", request: userVehicleRequest})
});

app.get('/api/user-request', isUserLoggedIn, async (req, res) => {
  try {
    const userRequests = await AppDataSource.getRepository(UserVehicleRequest).findOne({
      where: {user: req.user}
    })
    res.json(userRequests)
  } catch (e) {
    console.error(e.message)
    res.status(400).json({message: "Error fetching user requests"})
  }
});

app.get('/api/user-requests', isAdmin, async (req, res) => {
  try {
    const userRequests = await AppDataSource.getRepository(UserVehicleRequest).find({
      relations: ['user'],
      where: {status: "pending"}
    })
    res.json(userRequests)
  } catch (e) {
    console.error(e.message)
    res.status(400).json({message: "Error fetching user requests"})
  }
});

app.post('/api/user-requests/:id/accept', isAdmin, async (req, res) => {
  const {id} = req.params

  if (!id) {
    return res.status(400).json({message: "Request id is required"})
  }

  try {
    const userRequest = await AppDataSource.getRepository(UserVehicleRequest).findOneByOrFail({id: Number(id)})

    if (!userRequest) {
      return res.status(404).json({message: "Request not found"})
    }

    userRequest.setStatus("approved")
    await AppDataSource.getRepository(UserVehicleRequest).save(userRequest)

    res.json({message: "Request approved"})
  } catch (e) {
    console.error(e.message)
    res.status(400).json({message: "Error approving request"})
  }

});

app.post('/api/user-requests/:id/reject', isAdmin, async (req, res) => {
  const {id} = req.params

  try {
    const userRequest = await AppDataSource.getRepository(UserVehicleRequest).findOneByOrFail({id: Number(id)})

    if (!userRequest) {
      return res.status(404).json({message: "Request not found"})
    }

    userRequest.setStatus("rejected")
    await AppDataSource.getRepository(UserVehicleRequest).save(userRequest)

    res.json({message: "Request rejected"})
  } catch (e) {
    console.error(e.message)
    res.status(400).json({message: "Error rejecting request"})
  }
});

app.get('/api/toll-gates', isAdmin, async (req, res) => {
  try {
    const tollGates = await AppDataSource.getRepository(TollGate).find()
    res.json(tollGates)
  } catch (e) {
    console.error(e.message)
    res.status(400).json({message: "Error fetching toll gates"})
  }
});

app.post('/api/toll-gates', isAdmin, async (req, res) => {
  const {address, fee} = req.body

  if (!address || !fee || !Number(fee)) {
    return res.status(400).json({message: "All fields are required"})
  }

  try {
    const tollGate = AppDataSource.getRepository(TollGate).create({
      address,
      fee: Number(fee)
    })

    await AppDataSource.getRepository(TollGate).save(tollGate)
    res.json({message: "Toll gate created successfully"})
  } catch (e) {
    console.error(e.message)
    res.status(400).json({message: `Error creating toll gate: ${e.message}`})
  }
});

app.delete('/api/toll-gates/:id', isAdmin, async (req, res) => {
  const {id} = req.params

  try {
    await AppDataSource.getRepository(TollGate).delete(id)
    res.json({message: "Toll gate deleted"})
  } catch (e) {
    console.error(e.message)
    res.status(400).json({message: `Error deleting toll gate with id ${id}: ${e.message}`})
  }
});

app.get('/api/toll-gates/pay/:uuid', isUserLoggedIn, async (req, res) => {
  try {
    const tollGate = await AppDataSource.getRepository(TollGate).findOneByOrFail({uuid: req.params.uuid})

    if (!tollGate) {
      return res.status(404).json({message: "Toll gate not found"})
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'EGP',
            product_data: {
              name: 'Toll Gate Fee',
            },
            unit_amount: tollGate.fee * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({url: session.url});
  } catch (e) {
    console.error(e.message)
    res.status(400).json({message: `Error paying for toll gate: ${e.message}`})
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
