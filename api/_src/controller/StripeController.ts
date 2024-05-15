import {AppDataSource} from "../data-source";
import {Transaction} from "../entity/Transaction";
import {User} from "../entity/User";
import stripe from "../stripe";
import {Request, Response} from "express";

export class StripeController {
  public async handleStripeWebhook(req: Request, res: Response) {
    try {
      const event = await stripe.events.retrieve(req.body.id)

      switch (event.type) {
        case 'checkout.session.async_payment_failed':
          const checkoutSessionAsyncPaymentFailed = event.data.object
          await this.handleTransaction('failed', checkoutSessionAsyncPaymentFailed.id)
          break
        case 'checkout.session.async_payment_succeeded':
          const checkoutSessionAsyncPaymentSucceeded = event.data.object
          await this.handleTransaction('completed', checkoutSessionAsyncPaymentSucceeded.id)
          break
        case 'checkout.session.completed':
          const checkoutSessionCompleted = event.data.object
          await this.handleTransaction('completed', checkoutSessionCompleted.id)
          break
        case 'checkout.session.expired':
          const checkoutSessionExpired = event.data.object
          await this.handleTransaction('failed', checkoutSessionExpired.id)
          break
        default:
          console.log(`Unhandled event type ${event.type}`)
      }

      res.send()
    } catch (e) {
      res.status(400).json({message: 'Error handling webhook'})
    }
  }

  private async handleTransaction(status: 'completed' | 'failed', stripeSessionId: string) {
    const transaction = await AppDataSource.getRepository(Transaction).findOne({
      where: {stripeSessionId},
      relations: ['user'],
    })

    transaction.status = status
    await AppDataSource.getRepository(Transaction).save(transaction)

    if (transaction.user && transaction.type === 'deposit') {
      transaction.user.balance = String(Number(transaction.user.balance) + Number(transaction.amount))
      await AppDataSource.getRepository(User).save(transaction.user)
    }
  }
}
