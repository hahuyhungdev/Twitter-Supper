import { Application, Router } from 'express'
import userRouter from './user.routes'
import testRouter from './test.routes'

export function routes(app: Application): void {
  const apiV1Router = Router()
  apiV1Router.use('/users', userRouter)
  apiV1Router.use('/test', testRouter)
  app.use('/api/v1', apiV1Router)
}
