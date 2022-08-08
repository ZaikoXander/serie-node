import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"

dotenv.config()

import controllers from "./app/controllers/index.js"

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

controllers(app)

app.listen(Number(process.env.PORT) || 3333, () => {
  console.log(`HTTP server running on port ${process.env.PORT || 3333}`)
})
