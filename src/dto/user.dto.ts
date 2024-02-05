import User from '@/models/schemas/User.schema'
import { ObjectId } from 'mongodb'
export class LoginUserDTO {
  public id: ObjectId
  public name: string
  public email: string
  public accessToken: string
  public refreshToken: string
  constructor(payload: User, accessToken: string, refreshToken: string) {
    this.id = payload._id as ObjectId
    this.name = payload.name
    this.email = payload.email
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }
}
