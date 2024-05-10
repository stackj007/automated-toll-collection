import {AppDataSource} from "../data-source";
import {Transaction} from "../entity/Transaction";

export class TransactionController {
  public async getAllTransactions(req, res) {
    try {
      const transactions = await AppDataSource.getRepository(Transaction).find({
        relations: ['user'],
        order: {date: 'DESC'}
      })

      res.json(transactions)
    } catch (e) {
      res.status(400).json({message: 'Error fetching transactions'})
    }
  }

  public async getUserTransactions(req, res) {
    try {
      const transactions = await AppDataSource.getRepository(Transaction).find({
        where: {user: req.user},
        relations: ['user'],
        order: {date: 'DESC'}
      })

      res.json(transactions)
    } catch (e) {
      res.status(400).json({message: 'Error fetching transactions'})
    }
  }

  public async getTransaction(req, res) {
    try {
      const {id} = req.params
      const transaction = await AppDataSource.getRepository(Transaction).findOne({where: {id}, relations: ['user']})

      if (!transaction) {
        return res.status(404).json({message: 'Transaction not found'})
      }

      res.json(transaction)
    } catch (e) {
      res.status(400).json({message: 'Error fetching transaction'})
    }
  }
}
