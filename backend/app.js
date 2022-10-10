const express = require("express")
const projects = require("./routes/projects")
const app = express()
const connectDb = require("./db/connect")
const errorHandler = require("./middleware/error-handler")
const notFound = require("./middleware/not-found")
require("dotenv").config()

// middleware
app.use(express.json())
app.use("/api/v1/projects", projects)
app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 8080

/*
 * app.get('/api/v1/projects') - get all the tasks
 * app.post('/api/v1/projects') - create a new task
 * app.get('/api/v1/projects/:id') - get a single task
 * app.patch('/api/v1/projects/:id') - update task
 * app.delete('/api/v1/projects/:id') - delete tasks
 */

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    console.log("Connected to DB...")
    app.listen(port, () => console.log(`App is listening at port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
