import {Router} from "express";
import express from 'express'
import {TollgateController} from "../controller/TollgateController";
import {isAdmin} from "../middleware";

const router = express.Router()

export function tollGateRouter (): Router {
  const controller = new TollgateController()
  router.get('/', isAdmin, controller.getAllTollGates)
  router.post('/', isAdmin, controller.createTollGate)
  router.delete('/:id', isAdmin, controller.deleteTollGate)
  router.get('/pay/:uuid', controller.payTollGate)
  router.put('/:id', isAdmin, controller.editTollGate)

  return router
}
