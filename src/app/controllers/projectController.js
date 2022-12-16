import { Router } from "express"

import authMiddleware from "../middlewares/auth.js"

import Project from "../models/project.js"
import Task from "../models/task.js"

const router = Router()

router.use(authMiddleware)

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate(["user", "tasks"]) // to catch the user info

    return res.send({ projects })

  } catch (error) {
    return res.status(400).send({ error: "Error on loading projects" })
  }
})

router.get("/:projectId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate(["user", "tasks"])

    return res.send({ project })

  } catch (error) {
    return res.status(400).send({ error: "Error on loading project" })
  }
})

router.post("/", async (req, res) => {
  try {
    const { title, description, tasks } = req.body

    const project = await Project.create({ title, description, user: req.userId })

    await Promise.all(tasks.map(async task => {
      const projectTask = new Task({ ...task, project: project._id })

      await projectTask.save()

      project.tasks.push(projectTask)
    }))

    await project.save()

    return res.send({ project })
  } catch (error) {
    return res.status(400).send({ error: "Error on creating new project" })
  }
})

router.put("/:projectId", async (req, res) => {
  try {
    const { title, description, tasks } = req.body

    const project = await Project.findByIdAndUpdate(req.params.projectId, {
      title,
      description
    }, { new: true })

    project.tasks = []
    await Task.deleteOne({ project: project._id })

    await Promise.all(tasks.map(async task => {
      const projectTask = new Task({ ...task, project: project._id })

      await projectTask.save()

      project.tasks.push(projectTask)
    }))

    await project.save()

    return res.send({ project })
  } catch (error) {
    return res.status(400).send({ error: "Error on updating project" })
  }
})

router.delete("/:projectId", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.projectId)

    return res.send()
  } catch (error) {
    return res.status(400).send({ error: "Error deleting project" })
  }
})

export default app => app.use("/projects", router)
