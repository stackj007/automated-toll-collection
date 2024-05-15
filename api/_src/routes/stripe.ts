import {Router} from "express";
import express from 'express'
import {StripeController} from "../controller/StripeController";
import {AppDataSource} from "../data-source";
import {Transaction} from "../entity/Transaction";
import {User} from "../entity/User";
import stripe from "../stripe";

const router = express.Router()

export function stripeRouter (): Router {
  const controller = new StripeController()

  router.post('/stripe-webhook', controller.handleStripeWebhook)

  return router
}
