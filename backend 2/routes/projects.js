const express = require("express")
const router = express.Router()

const {
  getAllProject,
  createProject,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects")

router.route("/").get(getAllProject).post(createProject);
router.route("/:id").get(getProject).patch(updateProject).delete(deleteProject)

module.exports = router;