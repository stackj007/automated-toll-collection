import express from 'express'
import {Request, Response} from "express"
import {User} from "./entity/User"
import {AppDataSource} from "./data-source"
import session from 'express-session'
import cors from 'cors'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import passport from "./passport";

bodyParser.urlencoded({extended: false});

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
const sessionMiddleware = session({
    secret: 'cats',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
})
app.use(sessionMiddleware)
app.use(passport.authenticate('session'));
app.use(passport.initialize())
app.use(passport.session())
app.use(cors(
    {origin: 'http://localhost:3000', credentials: true, allowedHeaders: 'Content-Type, Authorization'}
))

function isUserLoggedIn(req: Request, res: Response, next: any) {
    req.user !== null ? next() : res.sendStatus(401)
}

function isAdmin(req: Request, res: Response, next: any) {
    // @ts-ignore
    req.user?.isAdmin ? next() : res.sendStatus(401)
}


app.post("/register", async (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(403).json({error: "Already logged in"});
    }

    const {email, password, confirmPassword} = req.body;

    if (!email && !password && !confirmPassword) {
        return res
            .status(403)
            .json({error: "All Fields are required"});
    }

    if (confirmPassword !== password) {
        return res
            .status(403)
            .json({error: "Password do not match"});
    }
    try {
        const existingUser = await AppDataSource.getRepository(User).findOneBy({email})
        if (existingUser) {
            return res
                .status(409)
                .json({error: "Email already exists"});
        }

        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = AppDataSource.getRepository(User).create({
            email: req.body.email,
            password: hashedPassword,
        });
        await AppDataSource.getRepository(User).save(user);

        delete user.password;
        return res.status(200).json({message: "Registration successful", user});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
});

app.post('/login',
    passport.authenticate('local', {failureMessage: 'failed'}),
    function (req, res) {
        res.json({message: 'Logged in', user: req.user});
    });

app.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.json({message: 'Logged out'});
    });
});

app.get("/user", async function (req: Request, res: Response) {
    if (req.user) {
        // @ts-ignore
        delete req.user.password;
        res.json({user: req.user});
    } else {
        res.status(403).json({error: "Not logged in"});
    }
})


AppDataSource
    .initialize()
    .then(() => {
        console.log("Database is connected")
        const server = app.listen(8080)
    }).catch((error) => {
    console.log("Error: ", error)
});
