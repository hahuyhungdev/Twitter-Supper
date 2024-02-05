import { TokenType } from '@/configs/userStatus'
import { JwtPayload } from 'jsonwebtoken'

export interface IRegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: Date
}
export interface ILogoutReqBody {
  refresh_token: string
}
export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
}
