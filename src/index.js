import express from "express"
import bodyParser from "body-parser"

import controllers from "./app/controllers/index.js"

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

controllers(app)

app.listen(3333, () => console.log("Server running on port", 3333))
