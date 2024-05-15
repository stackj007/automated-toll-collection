import {Router} from "express";
import express from 'express'
import {isAdmin} from "../middleware";
import {UserRequestController} from "../controller/UserRequestController";

const router = express.Router()

export function userRequestRouter (): Router {
  const controller = new UserRequestController()

  router.post('/user-request', controller.submitRequest)
  router.get('/user-request', controller.getUserRequest)
  router.get('/user-requests', isAdmin, controller.getAllUserRequests)
  router.post('/user-requests/:id/accept', isAdmin, controller.acceptUserRequest)
  router.post('/user-requests/:id/reject', isAdmin, controller.rejectUserRequest)

  return router
}
