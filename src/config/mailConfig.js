import dotenv from "dotenv"

dotenv.config()

export const host = process.env.MAIL_HOST
export const port = process.env.MAIL_PORT
export const user = process.env.MAIL_USER
export const pass = process.env.MAIL_PASS

const mailConfig = {
  host,
  port,
  user,
  pass
}

export default mailConfig
