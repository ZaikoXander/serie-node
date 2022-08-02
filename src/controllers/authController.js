import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import { authentication } from "../config/dotenv.js"

import User from "../models/user.js"

const router = Router()

function generateToken(params = {}) {
  return jwt.sign(params, authentication.AUTH_SECRET, {
    expiresIn: 86400 // 1 day in seconds
  })
}

router.post("/register", async (req, res) => {
  const { email } = req.body

  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: "User already exists" })

    const user = await User.create(req.body)

    user.password = undefined

    return res.status(201).send({
      user,
      token: generateToken({ id: user.id })
    })

  } catch (error) {
    return res.status(400).send({ error: "Registration failed" })
  }
})

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select("+password")

  if (!user)
    return res.status(400).send({ error: "User not found" })

  if (!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: "Invalid password" })

  user.password = undefined

  res.send({
    user,
    token: generateToken({ id: user.id })
  })
})

export default app => app.use("/auth", router)
