const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: [true, "project name must be provided."],
    trim: true,
  },
  discription: {
    type: String,
    required: [true, "project discription must be provided."],
  },
  author: {
    type: [String],
    required: [true, "can't post project without an author."],
  },
  collaborator: {
    type: [String],
  },
  technologyUsed: {
    type: [String],
    required: [true, "can't post project without any technologyr."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  deployment: {
    type: String,
  },
  code: {
    type: String,
  },
});

module.exports = mongoose.model('Project', projectSchema);