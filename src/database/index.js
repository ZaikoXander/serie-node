import mongoose from "mongoose"

import { database } from "../config/dotenv.js"

mongoose.connect(
  `mongodb+srv://${database.MONGO_USER}:${database.MONGO_PASSWORD}@${database.MONGO_DATABASE}.${database.MONGO_HOST}`
)

mongoose.Promise = global.Promise

export default mongoose
