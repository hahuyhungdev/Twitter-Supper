import { ErrorWithStatus } from '@/models/Erros'
import { HttpStatusCode } from 'axios'
import { NextFunction } from 'express'
import { Request, Response } from 'express-serve-static-core'
import { omit } from 'lodash'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json(omit(err, ['status']))
  }

  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, {
      enumerable: true
    })
  })
  res.status(HttpStatusCode.InternalServerError).json({
    message: err.message
  })
}
