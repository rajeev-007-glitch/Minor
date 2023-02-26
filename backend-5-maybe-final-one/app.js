require("dotenv").config()
require("express-async-errors")

const express = require('express')
const app = express()

// connect DB
const connectDb = require("./db/connect")

// error handler
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

app.use(express.json())
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// router
const projectRouter = require("./routes/projects")

// routes
app.use("/api/v2/projects", projectRouter)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    console.log("Connected to DB...")
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()