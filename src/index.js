import express from "express"
import bodyParser from "body-parser"

import authController from "./controllers/authController.js"
import projectController from "./controllers/projectController.js"

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

authController(app)
projectController(app)

app.listen(3333, () => console.log("Server running on port", 3333))
