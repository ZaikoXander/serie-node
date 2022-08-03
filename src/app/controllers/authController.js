import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import mailer from "../../modules/mailer.js"

import { AUTH_SECRET } from "../../config/authConfig.js"

import User from "../models/user.js"

const router = Router()

function generateToken(params = {}) {
  return jwt.sign(params, AUTH_SECRET, {
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

router.post("/forgot_password", async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).send({ error: "User not found" })
    }

    const token = crypto.randomBytes(20).toString("hex")

    const now = new Date()
    now.setHours(now.getHours() + 1)

    await User.findByIdAndUpdate(user.id, {
      "$set": {
        passwordResetToken: token,
        passwordResetExpires: now
      }
    })

    mailer.sendMail({
      to: email,
      from: "alexdaniel.lima.a@gmail.com",
      template: "auth/forgot_password",
      context: { token }
    }, (error) => {
      if (error) {
        return res.status(400).send({ error: "Cannot send forgot password email" })
      }

      return res.send()
    })

  } catch (error) {
    res.status(400).send({ error: "Error on forgot password, try again" })
  }
})

router.post("/reset_password", async (req, res) => {
  const { email, token, password } = req.body

  try {
    const user = await User.findOne({ email })
      .select("+passwordResetToken passwordResetExpires")

    if (!user) {
      return res.status(400).send({ error: "User not found" })
    }

    if (token !== user.passwordResetToken) {
      return res.status(400).send({ error: "Invalid token" })
    }

    const now = new Date()

    if (now > user.passwordResetExpires) {
      return res.status(400).send({ error: "Expired token, generate a new one" })
    }

    user.password = password

    await user.save()

    res.send()
  } catch (error) {
    res.status(400).send({ error: "Cannot reset password, try again" })
  }
})

export default app => app.use("/auth", router)
