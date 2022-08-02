import express from "express"
import bodyParser from "body-parser"

import authControllerRouter from "./controllers/authController.js"

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

authControllerRouter(app)

app.listen(3333, () => console.log("server on port", 3333))
