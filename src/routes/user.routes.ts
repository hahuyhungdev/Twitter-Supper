import {
  deleteUserController,
  getUsersController,
  loginController,
  registerController,
  logoutController
} from '@/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '@/middlewares/users.middlewares'
import { wrapRequestHandler } from '@/utils/wrapRequestHandler'
import { Router } from 'express'

const userRouter = Router()
userRouter.get('', wrapRequestHandler(getUsersController))
userRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))
userRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
userRouter.delete('/delete', wrapRequestHandler(deleteUserController))

export default userRouter
