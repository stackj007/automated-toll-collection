import {Router} from "express";
import express from 'express'
import {StripeController} from "../controller/StripeController";

const router = express.Router()

export function stripeRouter (): Router {
  const controller = new StripeController()

  router.post('/stripe-webhook', controller.handleStripeWebhook)

  return router
}
