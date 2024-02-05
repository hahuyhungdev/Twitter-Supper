import { USERS_MESSAGES } from '@/configs/messages'
import { LoginUserDTO } from '@/dto/user.dto'

import { ILogoutReqBody, IRegisterReqBody } from '@/models/requests/user.request'
import User from '@/models/schemas/User.schema'
import usersService from '@/services/users.service'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await usersService.getUsers()
    return res.status(200).json({ message: 'Get users successfully', data: users })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const loginController = async (req: Request<ParamsDictionary, any, IRegisterReqBody>, res: Response) => {
  const user = req.user as User

  const dataToken = await usersService.login((user._id as ObjectId).toString())
  const userRes = new LoginUserDTO(user, dataToken.accessToken, dataToken.refreshToken)

  return res.status(200).json({ message: USERS_MESSAGES.LOGIN_SUCCESS, data: userRes })
}
export const logoutController = async (req: Request<ParamsDictionary, any, ILogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  await usersService.logout(refresh_token)
  return res.status(200).json({ message: USERS_MESSAGES.LOGOUT_SUCCESS })
}
export const registerController = async (req: Request<ParamsDictionary, any, IRegisterReqBody>, res: Response) => {
  const result = await usersService.register(req.body)
  return res.status(200).json({ message: USERS_MESSAGES.REGISTER_SUCCESS, data: result })
}
export const deleteUserController = async (
  req: Request<
    ParamsDictionary,
    {
      email: string
    }
  >,
  res: Response
) => {
  const { email } = req.body

  const result = await usersService.deleteUser({ email })
  if (!result || result.deletedCount === 0) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
  return res.status(200).json({ message: 'Delete successfully', data: result })
}
