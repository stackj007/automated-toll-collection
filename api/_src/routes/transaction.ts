import {Router} from "express";
import express from 'express'
import {isAdmin} from "../middleware";
import {TransactionController} from "../controller/TransactionController";

const router = express.Router()

export function transactionRouter (): Router {
  const controller = new TransactionController()

  router.get('/', isAdmin, controller.getAllTransactions)
  router.get('/user', controller.getUserTransactions)
  router.get('/:id', isAdmin, controller.getTransaction)

  return router
}
