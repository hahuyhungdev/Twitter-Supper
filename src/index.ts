import databaseService from '@/services/database.service'
import express from 'express'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import { routes } from './routes'
import dotenv from 'dotenv'

dotenv.config()
export const app = express()
const port = process.env.PORT
databaseService.connect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

routes(app)

app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
