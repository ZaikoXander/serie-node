import mongoose from "mongoose"

import { DB_URL } from "../config/databaseConfig.js"

mongoose.connect(DB_URL)

mongoose.Promise = global.Promise

export default mongoose
