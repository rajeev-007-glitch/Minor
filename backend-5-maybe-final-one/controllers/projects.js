const Project = require("../models/project")
const { BadRequestError, NotFoundError } = require("../errors")
const { StatusCodes } = require("http-status-codes")
const { number } = require("joi")

const getAllProject = async (req, res) => {
  const { projectName, sort, numericFilters } = req.query
  const queryObject = {}
  if (projectName) {
    queryObject.projectName = { $regex: projectName, $options: "i" }
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gta",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lta",
    }
    const regex = /\b(<|>|>=|=|<|<=)\b/g
    var filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    )

    const options = ["rating"]
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-")
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }
    })
  }
  let result = Project.find(queryObject)
  if (sort === "latest") {
    result = result.sort("-createdAt")
  }
  if (sort === "oldest") {
    result = result.sort("createdAt")
  }
  if (sort === "a-z") {
    result = result.sort("position")
  }
  if (sort === "z-a") {
    result = result.sort("-position")
  } else {
    result = result.sort("createdAt")
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const projects = await result

  const totalProjects = await Project.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalProjects / limit)

  res.status(StatusCodes.OK).json({ projects, totalProjects, numOfPages })
}

const createProject = async (req, res) => {
  const project = await Project.create(req.body)
  res.status(StatusCodes.CREATED).json({ project })
}

const getProject = async (req, res) => {
  const projectId = req.params.id
  const project = await Project.findOne({ _id: projectId })
  if (!project) {
    throw new NotFoundError(
      `Project with projectId: ${projectId} does not exist...`
    )
  }
  res.status(StatusCodes.OK).json({ project })
}

const updateProject = async (req, res) => {
  const {
    body: {
      projectName,
      discription,
      author,
      technologyUsed,
      collaborator,
      deployment,
      code,
    },
    params: { id: projectId },
  } = req

  if (!projectName || !author || !technologyUsed || !code || !discription) {
    throw new BadRequestError(
      `ProjectName, Discription, Author, TechnologyUsed and code fields can't be empty`
    )
  }
  const project = await Project.findOneAndUpdate({ _id: projectId }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!project) {
    throw new NotFoundError(
      `Project with projectId: ${projectId} does not exist...`
    )
  }
  res.status(StatusCodes.OK).json({ project })
}

const deleteProject = async (req, res) => {
  const projectId = req.params.id

  const project = await Project.findByIdAndDelete({ _id: projectId })

  if (!project) {
    throw new NotFoundError(
      `Project with projectId: ${projectId} does not exist...`
    )
  }
  res.status(StatusCodes.OK).json({
    msg: `Project with projectId: ${projectId} has been successfully deleted...`,
  })
}

module.exports = {
  getAllProject,
  getProject,
  createProject,
  updateProject,
  deleteProject,
}
