import { ErrorWithStatus } from '@/models/Erros'
import { HttpStatusCode } from 'axios'
import { NextFunction, RequestHandler } from 'express'
import { Request, Response } from 'express-serve-static-core'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize } from 'lodash'

export const wrapRequestHandler = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
export function handleRefreshTokenError(error: unknown, status = HttpStatusCode.Unauthorized) {
  if (error instanceof JsonWebTokenError) {
    throw new ErrorWithStatus({
      message: capitalize(error.message),
      status
    })
  }
  throw error
}
