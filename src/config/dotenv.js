import dotenv from "dotenv"

dotenv.config()

export const database = {
  MONGO_DATABASE: process.env.MONGO_DATABASE,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_HOST: process.env.MONGO_HOST
}

export const authentication = {
  AUTH_SECRET: process.env.AUTH_SECRET
}

export default {
  database,
  authentication
}
