import { TokenPayload } from '@/models/requests/user.request'
import { config } from 'dotenv'
import { JwtPayload, Secret, SignOptions, VerifyOptions, sign, verify } from 'jsonwebtoken'
config()
export const signToken = ({
  payload,
  privateKey = process.env.JWT_PRIVATE_KEY as string,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  privateKey?: string
  options?: SignOptions
}) => {
  return new Promise((resolve, reject) => {
    sign(payload, privateKey, options, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}
export const verifyToken = ({
  token,
  secretOrPublicKey = process.env.JWT_PRIVATE_KEY as string,
  options = {
    algorithms: ['HS256']
  }
}: {
  token: string
  secretOrPublicKey?: Secret
  options?: VerifyOptions
}) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    verify(token, secretOrPublicKey, options, (err, decoded) => {
      if (err) reject(err)
      resolve(decoded as TokenPayload)
    })
  })
}
