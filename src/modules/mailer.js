import path from "path"
import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"

import { host, port, user, pass } from "../config/mailConfig.js"

const transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass
  }
})

transport.use("compile", hbs({
  viewEngine: {
    extName: ".html",
    partialsDir: path.resolve('./src/resources/mail'),
    defaultLayout: false,
  },
  viewPath: path.resolve("./src/resources/mail/"),
  extName: ".html",
}))

export default transport
