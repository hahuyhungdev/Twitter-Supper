import User from '@/models/schemas/User.schema'
import databaseService from './database.service'
import { IRegisterReqBody } from '@/models/requests/user.request'
import { signToken, verifyToken } from '@/utils/jwt'
import { TokenType } from '@/configs/userStatus'
import { hashPassword } from '@/utils/crypto'
import RefreshToken from '@/models/schemas/RefreshToken.schema'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USERS_MESSAGES } from '@/configs/messages'
config()

class UsersService {
  private signAccessToken(user_id: string): Promise<string> {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN
      }
    }) as Promise<string>
  }
  private signRefreshToken(user_id: string): Promise<string> {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN
      }
    }) as Promise<string>
  }
  private signAccessTokenAndRefreshToken(user_id: string): Promise<[string, string]> {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }
  async getUsers() {
    const result = await databaseService.users.find().toArray()
    return result
  }
  async register(payload: IRegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth) || new Date(),
        password: hashPassword(payload.password)
      })
    )

    const user_id = result.insertedId.toHexString()
    const [accessToken, refreshToken] = await this.signAccessTokenAndRefreshToken(user_id)

    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refreshToken as string
      })
    )
    return { accessToken, refreshToken }
  }
  async checkEmailExist(payload: { email: string }) {
    const user = await databaseService.users.findOne({ email: payload.email })
    return Boolean(user)
  }
  async login(user_id: string) {
    const [accessToken, refreshToken] = await this.signAccessTokenAndRefreshToken(user_id)
    const decoded_refresh_token = await verifyToken({ token: refreshToken })
    const expirationTimeInSeconds = Number(decoded_refresh_token?.exp)

    // Convert seconds to milliseconds and add to the current date
    const expirationTimeMilliseconds = expirationTimeInSeconds * 1000
    const expiredAt = new Date(expirationTimeMilliseconds)

    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refreshToken as string,
        expired_at: expiredAt
      })
    )
    return { accessToken, refreshToken }
  }
  async logout(refresh_token: string) {
    await databaseService.refreshTokens.deleteOne({ token: refresh_token })
    return {
      message: USERS_MESSAGES.LOGOUT_SUCCESS
    }
  }
  async deleteUser(payload: { email: string }) {
    const { email } = payload
    const result = await databaseService.users.deleteOne({ email })
    return result
  }
}

const usersService = new UsersService()

export default usersService
