const Project = require("../models/project")
const { BadRequestError, NotFoundError } = require("../errors")
const product = require("../../../nodejs/July learning/04-store-api/models/product")
const project = require("../models/project")

const getAllProject = async (req, res) => {
  // const projects = await Project.find({})
  // res.status(200).json({ projects })

  const { projectName, sort, numericFilters } = req.query
  const queryObject = {}
  if(projectName){
    queryObject.projectName = { $regex: projectName, $options: "i" }
  }
  if(numericFilters){
    const operatorMap = {
      ">": "$gt",
      ">=": "$gta",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lta",
    }
    const regex = /\b(<|>|>=|=|<|<=)\b/g
    var filters = numericFilters.replace(regex,(match=>`-${operatorMap[match]}-`))

    const options = ["rating"]
    filters = filters.split(",").forEach((item)=>{
      const [field, operator, value] = item.split("-")
      if(options.includes(field)){
        queryObject[field] = {[operator]: Number(value)}
      }
    })
  }
  let result = Project.find(queryObject)
  if(sort){
    const sortList = sort.split(",").join(" ")
    result = result.sort(sortList)
  }
  else{
    result = result.sort("createdAt")
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const projects = await result
  res.status(200).json({projects, nbhits: projects.length})
}

const createProject = async (req, res) => {
  req.body.createdBy = req.user.userId
  const project = await Project.create(req.body)
  res.status(201).json({ project })
}

const getProject = async (req, res) => {
  const { id: projectId } = req.params
  const project = await Project.findOne({ _id: projectId })
  if (!project) {
      throw new NotFoundError(`Project with projectId: ${projectId} does not exist...`)
      
  }
  res.status(200).json({ project })
}

const updateProject = async (req, res) => {
  const { id: projectId } = req.params
  const project = await Project.findOneAndUpdate({ _id: projectId }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!project) {
    throw new NotFoundError(`Project with projectId: ${projectId} does not exist...`)
  }
  res.status(200).json({ project })
}

const deleteProject = async (req, res) => {
  const { id: projectId } = req.params
  const peoject = await Project.findByIdAndDelete({ _id: projectId })
  if (!project) {
    throw new NotFoundError(`Project with projectId: ${projectId} does not exist...`)
  }
  res.status(200).json({
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
