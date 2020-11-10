const path = require("path")
const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const colors = require("colors")
const mongoSanitize = require("express-mongo-sanitize")
const helmet = require("helmet")
const xss = require("xss-clean")
const rateLimit = require("express-rate-limit")
const hpp = require("hpp")
const cors = require("cors")
const fileupload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const errorHandler = require("./middleware/error")
const connectDB = require("./config/db")

// Route files
const bootcampsRoutes = require("./routes/bootcamps")
const coursesRoutes = require("./routes/courses")
const authRoutes = require("./routes/auth")
const usersRoutes = require("./routes/users")
const reviewsRoutes = require("./routes/reviews")

// Load env vars
dotenv.config({ path: "./config/config.env" })

// Database connection
connectDB()

const app = express()

// Body Parser
app.use(express.json())

// Cookie Parser
app.use(cookieParser())

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// File uploading
app.use(fileupload())

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Enable CORS
app.use(cors())

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
})

app.use(limiter)

// Prevent http param polution
app.use(hpp())

// Set static folder
app.use(express.static(path.join(__dirname, "public")))

// Mount routers
app.use("/api/v1/bootcamps", bootcampsRoutes)
app.use("/api/v1/courses", coursesRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", usersRoutes)
app.use("/api/v1/reviews", reviewsRoutes)

// Error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
)

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  server.close(() => process.exit(1))
})
