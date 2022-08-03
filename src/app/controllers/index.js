import authController from "./authController.js"
import projectController from "./projectController.js"

export default app => {
  authController(app)
  projectController(app)
}
