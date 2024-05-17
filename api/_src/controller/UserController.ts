import {AppDataSource} from "../data-source";
import {User} from "../entity/User";
import bcrypt from "bcrypt";
import passport from "../passport";
import {Request, Response} from "express";
import {Transaction} from "../entity/Transaction";
import stripe from "../stripe";

export class UserController {
  public async register(req: Request, res: Response) {
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
  }

  public async login(req: Request, res: Response) {
    await (passport.authenticate('local', {failureMessage: 'failed'}, function (err, user, info) {
      if (err) {
        return res.status(500).json({message: err.message})
      }

      if (!user) {
        return res.status(401).json({message: info.message})
      }

      req.logIn(user, async function (err) {
        if (err) {
          return res.status(500).json({message: err.message})
        }

        const dbUser = await AppDataSource.getRepository(User)
          .findOne({
            where: {id: user.id},
            relations: ['userVehicleRequest'],
          })

        return res.json({message: 'Logged in', user: dbUser})
      })
    })(req, res))
  }

  public async logout(req: Request, res: Response, next: any) {
    req.logout(function (err) {
      if (err) {
        return next(err)
      }
      res.json({message: 'Logged out'})
    })
  }

  public async getCurrentUser(req: Request, res: Response) {
    if (!req.user) {
      res.status(403).json({error: 'Not logged in'})
      return
    }

    res.json({user: req.user})
  }

  public async getAllUsers(req: Request, res: Response) {
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

  public async deleteUser(req: Request, res: Response) {
    const {id} = req.body

    try {
      await AppDataSource.getRepository(User).delete(id)
      res.json({message: 'User deleted'})
    } catch (e) {
      res.status(400).json({message: 'Error delete the user'})
    }
  }

  public async editUser(req: Request, res: Response) {
    const {id, name, email, isAdmin} = req.body

    try {
      const user = await AppDataSource.getRepository(User).findOneBy({id})

      if (!user) {
        res.status(404).json({message: "user doesn't not exist"})
      }

      await AppDataSource.getRepository(User).update(id, {name, email, isAdmin})
      res.json({message: 'User deleted'})
    } catch (e) {
      res.status(400).json({message: 'Error delete the user'})
    }
  }

  public async recharge(req: Request, res: Response) {
    const {amount} = req.body

    if (!amount || !Number(amount)) {
      return res.status(400).json({message: 'Amount is required'})
    }

    try {
      const transaction = AppDataSource.getRepository(Transaction).create({
        amount: String(amount),
        user: req.user,
        type: 'deposit'
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
      await AppDataSource.getRepository(Transaction).save(transaction)

      res.json({message: 'Recharge initiated', url: session.url})
    } catch (e) {
      res.status(400).json({message: `Error recharging: ${e.message}`})
    }
  }
}
