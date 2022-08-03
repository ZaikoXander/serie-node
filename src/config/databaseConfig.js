import dotenv from "dotenv"

dotenv.config()

export const MONGO_DATABASE = process.env.MONGO_DATABASE
export const MONGO_USER = process.env.MONGO_USER
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD
export const MONGO_HOST = process.env.MONGO_HOST

const databaseConfig = {
  MONGO_DATABASE,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST
}

export default databaseConfig
