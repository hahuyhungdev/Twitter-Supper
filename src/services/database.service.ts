import RefreshToken from '@/models/schemas/RefreshToken.schema'
import User from '@/models/schemas/User.schema'
import dotenv from 'dotenv'
import { Collection, Db, MongoClient } from 'mongodb'
dotenv.config()

// Replace the following with your Atlas connection string
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.PASSWORD_DATABASE}@twitter.wfhhh29.mongodb.net/`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(`${process.env.DB_NAME}`)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(`There was an error connecting to MongoDB. Check whether your URI is correct. ${error}`)
      throw error
    }
  }
  get users(): Collection<User> {
    return this.db.collection('users')
  }
  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection('refresh_tokens')
  }
}
// create a new instance of the Database class
const databaseService = new DatabaseService()
export default databaseService
