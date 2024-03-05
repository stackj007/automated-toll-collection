import passport from "passport";
import {Strategy} from "passport-local";
import {AppDataSource} from "../data-source";
import {User} from "../entity/User";
import bcrypt from "bcrypt";

passport.serializeUser((user: User, done) => {
    done(null, user);
});

passport.deserializeUser((user: User, done) => {
    done(null, user);
});

passport.use(
    new Strategy({
            usernameField: 'email',
            passwordField: 'password'
        }, async (email, password, done) => {
            try {
                const user = await AppDataSource.getRepository(User).findOneBy({email})
                if (!user) {
                    return done(null, false, {message: "Incorrect username"});
                }

                const passwordsMatch = await bcrypt.compare(
                    password,
                    user.password
                );

                if (passwordsMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Incorrect password"});
                }
            } catch (err) {
                return done(err);
            }
        }
    ));

export default passport;
