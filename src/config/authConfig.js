import dotenv from "dotenv"

dotenv.config()

export const AUTH_SECRET = process.env.AUTH_SECRET

const authConfig = {
  AUTH_SECRET
}

export default authConfig
