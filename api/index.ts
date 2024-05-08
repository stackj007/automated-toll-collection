import express from 'express'
import {Request, Response} from 'express'
import session from 'express-session'
import cors from 'cors'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import passport from './src/passport'
import {User} from './src/entity/User'
import {AppDataSource} from './src/data-source'
import 'dotenv/config'
import {UTApi} from 'uploadthing/server'
import {UserVehicleRequest} from './src/entity/UserVehicleRequest'
import fileUpload, {
  UploadedFile,
} from 'express-fileupload'
import {TypeormStore} from 'connect-typeorm'
import {Session} from './src/entity/Session'
import {UploadFileResult} from 'uploadthing/types'
import {TollGate} from './src/entity/TollGate'
import {Stripe} from 'stripe'
import {Transaction} from './src/entity/Transaction'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const utApi = new UTApi()

const sessionRepository = AppDataSource.getRepository(Session)

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
    ttl: 86400,
  }).connect(sessionRepository),
})

app.use(sessionMiddleware)
app.use(passport.authenticate('session'))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.raw({type: '*/*'})) // for stripe webhook
app.use(bodyParser.json())

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    methods: ['PUT', 'DELETE', 'POST', 'GET', 'PATCH']
  })
)
app.use(
  fileUpload({
    limits: {fileSize: 24 * 1024 * 1024},
  })
)

passport.serializeUser((user: User, done) => {
  AppDataSource.getRepository(User)
    .findOne({
      where: {id: user.id},
      relations: ['userVehicleRequest'],
    })
    .then((user) => {
      done(null, user)
    })
})

passport.deserializeUser((user: User, done) => {
  AppDataSource.getRepository(User)
    .findOne({
      where: {id: user.id},
      relations: ['userVehicleRequest'],
    })
    .then((user) => {
      done(null, user)
    })
})

function isUserLoggedIn(
  req: Request,
  res: Response,
  next: any
) {
  req.user ? next() : res.sendStatus(401)
}

function isAdmin(req: Request, res: Response, next: any) {
  // @ts-ignore
  req.user?.isAdmin ? next() : res.sendStatus(401)
}

app.get('/', (req, res) => res.send('Express on Vercel'))

app.post('/api/register', async (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(403).json({error: 'Already logged in'})
  }

  const {email, password, confirmPassword, name} = req.body

  if (!email || !password || !confirmPassword || !name) {
    return res.status(403).json({error: 'All Fields are required'})
  }

  if (password.length < 8) {
    return res.status(403)
  }

  if (confirmPassword !== password) {
    return res.status(403).json({error: 'Password do not match'})
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
      name,
    })
    await AppDataSource.getRepository(User).save(user)

    passport.authenticate('local', {failureMessage: 'Incorrect email or password'})(req, res, () => {
      return res.json({message: 'Logged in', user: req.user});
    });
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
})

app.post(
  '/api/login',
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

app.get(
  '/api/user',
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

app.get(
  '/api/users',
  async (req: Request, res: Response) => {
    try {
      const users = await AppDataSource.getRepository(
        User
      ).find()

      users.forEach((user) => delete user.password)
      res.json(users)
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  }
)

app.post('/api/delete-user', isAdmin, async (req, res) => {
  const {id} = req.body

  try {
    await AppDataSource.getRepository(User).delete(id)
    res.json({message: 'User deleted'})
  } catch (e) {
    console.error(e.message)
    res
      .status(400)
      .json({message: 'Error delete the user'})
  }
})

app.post('/api/edit-user', isAdmin, async (req, res) => {
  const {id, name, email, isAdmin} = req.body

  try {
    const user = await AppDataSource.getRepository(
      User
    ).findOneBy({id})

    if (!user) {
      res
        .status(404)
        .json({message: "user doesn't not exist"})
    }

    user.name = name
    user.email = email
    user.isAdmin = isAdmin

    await AppDataSource.getRepository(User).save(user)
    res.json({message: 'User deleted'})
  } catch (e) {
    console.error(e.message)
    res
      .status(400)
      .json({message: 'Error delete the user'})
  }
})

app.post(
  '/api/user-request',
  isUserLoggedIn,
  async (req, res) => {
    const {vehicleNumber} = req.body
    if (!vehicleNumber) {
      return res
        .status(400)
        .json({message: 'vehicle number is required'})
    }

    if (
      await AppDataSource.getRepository(
        UserVehicleRequest
      ).findOneBy({vehicleNumber})
    ) {
      return res
        .status(400)
        .json({message: 'Vehicle number already exists'})
    }

    if (
      !req?.files ||
      Object.keys(req?.files).length !== 3
    ) {
      return res.status(400).send('All files are required')
    }

    // TODO: all .jpg, .jpeg, .png
    const {id, license, rcBook} = req.files as {
      [key: string]: UploadedFile
    }

    if (!id || !license || !rcBook) {
      return res.status(400).send('All files are required')
    }

    const uploadedResults: UploadFileResult[] =
      await utApi.uploadFiles([
        new File([id.data], id.name),
        new File([license.data], license.name),
        new File([rcBook.data], rcBook.name),
      ])

    if (
      uploadedResults.filter((result) => result.error)
        .length > 0
    ) {
      return res
        .status(500)
        .json({
          message:
            'Error uploading files, please try again',
        })
    }

    const urls = uploadedResults.map(
      (result) => result.data.url
    )
    const userVehicleRequest = AppDataSource.getRepository(
      UserVehicleRequest
    ).create({
      vehicleNumber,
      idCardUrl: urls[0],
      driverLicenseUrl: urls[1],
      vehicleRCBookUrl: urls[2],
      user: req.user as unknown as User,
    })

    await AppDataSource.getRepository(
      UserVehicleRequest
    ).save(userVehicleRequest)

    res.json({
      message: 'Request submitted successfully',
      request: userVehicleRequest,
    })
  }
)

app.get(
  '/api/user-request',
  isUserLoggedIn,
  async (req, res) => {
    try {
      const userRequests =
        await AppDataSource.getRepository(
          UserVehicleRequest
        ).findOne({
          where: {user: req.user},
        })
      res.json(userRequests)
    } catch (e) {
      console.error(e.message)
      res
        .status(400)
        .json({message: 'Error fetching user requests'})
    }
  }
)

app.get('/api/user-requests', isAdmin, async (req, res) => {
  try {
    const userRequests = await AppDataSource.getRepository(
      UserVehicleRequest
    ).find({
      relations: ['user'],
      where: {status: 'pending'},
    })
    res.json(userRequests)
  } catch (e) {
    console.error(e.message)
    res
      .status(400)
      .json({message: 'Error fetching user requests'})
  }
})

app.post(
  '/api/user-requests/:id/accept',
  isAdmin,
  async (req, res) => {
    const {id} = req.params

    if (!id) {
      return res
        .status(400)
        .json({message: 'Request id is required'})
    }

    try {
      const userRequest = await AppDataSource.getRepository(
        UserVehicleRequest
      ).findOneByOrFail({id: Number(id)})

      if (!userRequest) {
        return res
          .status(404)
          .json({message: 'Request not found'})
      }

      userRequest.setStatus('approved')
      await AppDataSource.getRepository(
        UserVehicleRequest
      ).save(userRequest)

      res.json({message: 'Request approved'})
    } catch (e) {
      console.error(e.message)
      res
        .status(400)
        .json({message: 'Error approving request'})
    }
  }
)

app.post(
  '/api/user-requests/:id/reject',
  isAdmin,
  async (req, res) => {
    const {id} = req.params

    try {
      const userRequest = await AppDataSource.getRepository(
        UserVehicleRequest
      ).findOneByOrFail({id: Number(id)})

      if (!userRequest) {
        return res
          .status(404)
          .json({message: 'Request not found'})
      }

      userRequest.setStatus('rejected')
      await AppDataSource.getRepository(
        UserVehicleRequest
      ).save(userRequest)

      res.json({message: 'Request rejected'})
    } catch (e) {
      console.error(e.message)
      res
        .status(400)
        .json({message: 'Error rejecting request'})
    }
  }
)

app.get('/api/toll-gates', isAdmin, async (req, res) => {
  try {
    const tollGates = await AppDataSource.getRepository(
      TollGate
    ).find()
    res.json(tollGates)
  } catch (e) {
    console.error(e.message)
    res
      .status(400)
      .json({message: 'Error fetching toll gates'})
  }
})

app.post('/api/toll-gates', isAdmin, async (req, res) => {
  const {address, fee} = req.body

  if (!address || !fee || !Number(fee)) {
    return res
      .status(400)
      .json({message: 'All fields are required'})
  }

  try {
    const tollGate = AppDataSource.getRepository(
      TollGate
    ).create({
      address,
      fee: Number(fee),
    })

    await AppDataSource.getRepository(TollGate).save(
      tollGate
    )
    res.json({
      message: 'Toll gate created successfully',
      tollGate,
    })
  } catch (e) {
    console.error(e.message)
    res
      .status(400)
      .json({
        message: `Error creating toll gate: ${e.message}`,
      })
  }
})

app.delete(
  '/api/toll-gates/:id',
  isAdmin,
  async (req, res) => {
    const {id} = req.params

    try {
      await AppDataSource.getRepository(TollGate).delete(id)
      res.json({message: 'Toll gate deleted'})
    } catch (e) {
      console.error(e.message)
      res
        .status(400)
        .json({
          message: `Error deleting toll gate with id ${id}: ${e.message}`,
        })
    }
  }
)

app.get('/api/toll-gates/pay/:uuid', async (req, res) => {
  try {
    const tollGate = await AppDataSource.getRepository(
      TollGate
    ).findOneByOrFail({uuid: req.params.uuid})

    if (!tollGate) {
      return res
        .status(404)
        .json({message: 'Toll gate not found'})
    }

    const user = req.user as User | null
    if (user && tollGate.fee < Number(user?.balance)) {
      const transaction = AppDataSource.getRepository(
        Transaction
      ).create({
        amount: String(tollGate.fee),
        user: user,
        status: 'completed',
      })

      user.balance = String(
        Number(user.balance) - tollGate.fee
      )

      await AppDataSource.getRepository(User).save(user)
      await AppDataSource.getRepository(Transaction).save(
        transaction
      )

      return res.redirect(
        303,
        `${process.env.FRONTEND_URL}/success`
      )
    }
    const transaction = AppDataSource.getRepository(
      Transaction
    ).create({
      amount: String(tollGate.fee),
      user: user,
    })

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
    })

    transaction.stripeSessionId = session.id
    await AppDataSource.getRepository(Transaction).save(
      transaction
    )

    res.redirect(303, session.url)
  } catch (e) {
    console.error(e.message)
    res
      .status(400)
      .json({
        message: `Error paying for toll gate: ${e.message}`,
      })
  }
})

const handleTransaction = async (
  status: 'completed' | 'failed',
  stripeSessionId: string
) => {
  const transaction = await AppDataSource.getRepository(
    Transaction
  ).findOne({
    where: {stripeSessionId},
    relations: ['user'],
  })
  transaction.status = status
  await AppDataSource.getRepository(Transaction).save(
    transaction
  )

  if (transaction.user && transaction.type === 'deposit') {
    transaction.user.balance = String(
      Number(transaction.user.balance) +
      Number(transaction.amount)
    )
    await AppDataSource.getRepository(User).save(
      transaction.user
    )
  }
}

app.post(
  '/api/stripe-webhook',
  express.raw({type: 'application/json'}),
  async (request, response) => {
    const event = await stripe.events.retrieve(
      request.body.id
    )

    switch (event.type) {
      case 'checkout.session.async_payment_failed':
        const checkoutSessionAsyncPaymentFailed =
          event.data.object
        await handleTransaction(
          'failed',
          checkoutSessionAsyncPaymentFailed.id
        )
        break
      case 'checkout.session.async_payment_succeeded':
        const checkoutSessionAsyncPaymentSucceeded =
          event.data.object
        await handleTransaction(
          'completed',
          checkoutSessionAsyncPaymentSucceeded.id
        )
        break
      case 'checkout.session.completed':
        const checkoutSessionCompleted = event.data.object
        await handleTransaction(
          'completed',
          checkoutSessionCompleted.id
        )
        break
      case 'checkout.session.expired':
        const checkoutSessionExpired = event.data.object
        await handleTransaction(
          'failed',
          checkoutSessionExpired.id
        )
        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    response.send()
  }
)

app.get('/api/transactions', isAdmin, async (req, res) => {
  try {
    const transactions = await AppDataSource.getRepository(
      Transaction
    ).find({relations: ['user'], order: {date: 'DESC'}})
    res.json(transactions)
  } catch (e) {
    console.error(e.message)
    res
      .status(400)
      .json({message: 'Error fetching transactions'})
  }
})

app.get('/api/transactions/:id', async (req, res) => {
  try {
    const {id} = req.params
    const transaction = await AppDataSource.getRepository(
      Transaction
    ).findOne({where: {id}, relations: ['user']})

    if (!transaction) {
      return res
        .status(404)
        .json({message: 'Transaction not found'})
    }

    res.json(transaction)
  } catch (e) {
    console.error(e.message)
    res
      .status(400)
      .json({message: 'Error fetching transaction'})
  }
})

app.get(
  '/api/transactions/user',
  isUserLoggedIn,
  async (req, res) => {
    try {
      const transactions =
        await AppDataSource.getRepository(Transaction).find(
          {where: {user: req.user}, relations: ['user']}
        )
      res.json(transactions)
    } catch (e) {
      console.error(e.message)
      res
        .status(400)
        .json({message: 'Error fetching transactions'})
    }
  }
)

app.post('/api/recharge', isUserLoggedIn, async (req, res) => {
    const {amount} = req.body

    if (!amount || !Number(amount)) {
      return res
        .status(400)
        .json({message: 'Amount is required'})
    }

    try {
      const transaction = AppDataSource.getRepository(
        Transaction
      ).create({
        amount: String(amount),
        user: req.user,
        type: 'deposit',
      })

      const session = await stripe.checkout.sessions.create(
        {
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'EGP',
                product_data: {
                  name: 'Recharge',
                },
                unit_amount: Number(amount) * 100,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${process.env.FRONTEND_URL}/success`,
          cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        }
      )

      transaction.stripeSessionId = session.id
      await AppDataSource.getRepository(Transaction).save(
        transaction
      )

      res.json({
        message: 'Recharge initiated',
        url: session.url,
      })
    } catch (e) {
      console.error(e.message)
      res
        .status(400)
        .json({message: `Error recharging: ${e.message}`})
    }
  }
);
app.get('/api/health-check', (req, res) => {
    res.send('OK')
  }
);

(async () => {
  await AppDataSource.initialize()
  console.log('Database is connected')
  app.listen(process.env.PORT || 8000)

  module.exports = app
})()

