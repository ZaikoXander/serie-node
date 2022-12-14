import mongoose from "../../database/index.js"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre("save", async function(next) { // Before saving a new User
  const hash = await bcrypt.hash(this.password, 10) // encrypt the password
  this.password = hash

  next()
})

const User = mongoose.model("User", UserSchema)

export default User
