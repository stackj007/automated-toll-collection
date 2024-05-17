import express from 'express'
import session from 'express-session'
import cors from 'cors'
import bodyParser from 'body-parser'
import passport from './_src/passport'
import {AppDataSource} from './_src/data-source'
import 'dotenv/config'
import fileUpload from 'express-fileupload'
import {TypeormStore} from 'connect-typeorm'
import {Session} from './_src/entity/Session'
import router from "./router";

const sessionRepository = AppDataSource.getRepository(Session)
const app = express()

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

app.use(express.json())
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(sessionMiddleware)
app.use(passport.authenticate('session'))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.raw({type: 'application/json'}))
app.use(bodyParser.json({limit: '50mb'}))
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}))
app.use(fileUpload({limits: {fileSize: 50 * 1024 * 1024},}))

app.get('/', (req, res) => res.send('Express on Vercel'))

app.use('/api', router);

(async () => {
  await AppDataSource.initialize()
  console.log('Database is connected')
  app.listen(process.env.PORT || 8000)

  module.exports = app
})()
