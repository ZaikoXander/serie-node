import mongoose from "mongoose"

import { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE, MONGO_HOST } from "../config/databaseConfig.js"

mongoose.connect(
  `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DATABASE}.${MONGO_HOST}`
)

mongoose.Promise = global.Promise

export default mongoose
