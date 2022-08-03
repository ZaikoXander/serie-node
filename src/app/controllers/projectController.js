import { Router } from "express"

import authMiddleware from "../middlewares/auth.js"

const router = Router()

router.use(authMiddleware)

router.get("/", (req, res) => {
  res.send({ ok: true, user: req.userId })
})

export default app => app.use("/projects", router)
