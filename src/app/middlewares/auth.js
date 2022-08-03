import jwt from "jsonwebtoken"
import { AUTH_SECRET } from "../../config/authConfig.js"

export default (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({ error: "No token provided" })
  }

  // Bearer d7has75dn4id3mh72rgn9ud5dsa
  const parts = authHeader.split(" ")

  if (!parts.length === 2) {
    return res.status(401).send({ error: "Token error" })
  }

  const [ scheme, token ] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Malformatted token" })
  }

  jwt.verify(token, AUTH_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).send({ error: "Invalid token" })
    }

    req.userId = decoded.id

    return next()
  })
}
