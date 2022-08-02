import mongoose from "mongoose"

import config from "../config/dotenv.js"

mongoose.connect(
  `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_DATABASE}.${config.MONGO_HOST}`
)

mongoose.Promise = global.Promise

export default mongoose
