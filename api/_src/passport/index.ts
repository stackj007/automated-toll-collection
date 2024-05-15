import passport from "passport";
import {Strategy} from "passport-local";
import {AppDataSource} from "../data-source";
import {User} from "../entity/User";
import bcrypt from "bcrypt";

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

export default passport;
