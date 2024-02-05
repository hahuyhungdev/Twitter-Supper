import {
  deleteUserController,
  getUsersController,
  loginController,
  registerController,
  logoutController
} from '@/controllers/users.controllers'
import { accessTokenValidator, loginValidator, registerValidator } from '@/middlewares/users.middlewares'
import { wrapRequestHandler } from '@/utils/wrapRequestHandler'
import { Router } from 'express'

const testRouter = Router()
testRouter.get('', wrapRequestHandler(getUsersController))
testRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
testRouter.post('/logout', accessTokenValidator, wrapRequestHandler(logoutController))
testRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
testRouter.delete('/delete', wrapRequestHandler(deleteUserController))

export default testRouter
