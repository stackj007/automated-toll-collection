import {AppDataSource} from "../data-source";
import {TollGate} from "../entity/TollGate";
import {User} from "../entity/User";
import {Transaction} from "../entity/Transaction";
import {Request, Response} from "express";
import stripe from "../stripe";

export class TollgateController {
  public async getAllTollGates(req: Request, res: Response) {
    try {
      const tollGates = await AppDataSource.getRepository(TollGate).find()
      res.json(tollGates)
    } catch (e) {
      res.status(400).json({message: 'Error fetching toll gates'})
    }
  }

  public async createTollGate(req: Request, res: Response) {
    const {address, priceList} = req.body

    if (!address || !priceList) {
      return res.status(400).json({message: 'All fields are required'})
    }

    try {
      const tollGate = AppDataSource.getRepository(TollGate).create({address, priceList})

      await AppDataSource.getRepository(TollGate).save(tollGate)
      res.json({message: 'Toll gate created successfully', tollGate})
    } catch (e) {
      res.status(400).json({message: `Error creating toll gate: ${e.message}`})
    }
  }

  public async deleteTollGate(req: Request, res: Response) {
    const {id} = req.params

    try {
      await AppDataSource.getRepository(TollGate).delete(id)
      res.json({message: 'Toll gate deleted'})
    } catch (e) {
      res.status(400).json({message: `Error deleting toll gate with id ${id}: ${e.message}`})
    }
  }

  public async payTollGate(req: Request, res: Response) {
    try {
      const tollGate = await AppDataSource.getRepository(TollGate).findOneByOrFail({uuid: req.params.uuid})

      if (!tollGate) {
        return res.status(404).json({message: 'Toll gate not found'})
      }

      const user = req.user as User | null

      if (user && tollGate.fee(user) < Number(user?.balance)) {
        const transaction = AppDataSource.getRepository(Transaction).create({
          amount: String(tollGate.fee(user)),
          user: user,
          status: 'completed',
          tollGate: tollGate,
        })

        user.balance = String(Number(user.balance) - tollGate.fee(user))

        await AppDataSource.getRepository(User).save(user)
        await AppDataSource.getRepository(Transaction).save(transaction)

        return res.redirect(303, `${process.env.FRONTEND_URL}/success`)
      }

      const transaction = AppDataSource.getRepository(Transaction).create({
        amount: String(tollGate.fee(user)),
        user: user,
        tollGate: tollGate,
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
              unit_amount: tollGate.fee(user) * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      })

      transaction.stripeSessionId = session.id
      await AppDataSource.getRepository(Transaction).save(transaction)

      res.redirect(303, session.url)
    } catch (e) {
      res.status(400).json({message: `Error paying for toll gate: ${e.message}`,})
    }
  }

  public async editTollGate(req: Request, res: Response) {
    const {id} = req.params
    const {address, priceList} = req.body

    if (!address || !priceList) {
      return res.status(400).json({message: 'All fields are required'})
    }

    try {
      const tollGate = await AppDataSource.getRepository(TollGate).findOneByOrFail({id: Number(id)})

      if (!tollGate) {
        return res.status(404).json({message: 'Toll gate not found'})
      }

      tollGate.address = address
      tollGate.priceList = priceList

      await AppDataSource.getRepository(TollGate).save(tollGate)
      res.json({message: 'Toll gate updated successfully', tollGate})
    } catch (e) {
      res.status(400).json({message: `Error updating toll gate: ${e.message}`})
    }
  }
}
