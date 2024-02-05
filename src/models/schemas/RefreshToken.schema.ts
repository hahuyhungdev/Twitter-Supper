import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
interface IRefreshToken {
  _id?: ObjectId
  token: string
  created_at?: Date
  expired_at?: Date
  user_id: ObjectId
}

export default class RefreshToken {
  _id?: ObjectId
  token: string
  created_at?: Date
  user_id: ObjectId
  expired_at?: Date
  constructor({ _id, token, created_at, expired_at, user_id }: IRefreshToken) {
    this._id = _id
    this.token = token
    this.created_at = created_at || new Date()
    this.user_id = user_id
    this.expired_at = expired_at || new Date()
  }
}
