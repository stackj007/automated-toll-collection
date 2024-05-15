import {Router} from "express";
import express from 'express'
import {isAdmin} from "../middleware";
import {UserController} from "../controller/UserController";

const router = express.Router()

export function userRouter (): Router {
  const controller = new UserController()
  router.post('/register', controller.register)
  router.post('/login', controller.login)
  router.post('/logout', controller.logout)
  router.get('/user', controller.getCurrentUser)
  router.get('/users', isAdmin, controller.getAllUsers)
  router.post('/delete-user', isAdmin, controller.deleteUser)
  router.post('/edit-user', isAdmin, controller.editUser)
  router.post('/user/balance', controller.recharge)

  return router
}
