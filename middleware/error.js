const ErrorResponse = require("../utils/errorResponse")

const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  // Log to console for dev
  console.log(err.stack.red)

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with the id of ${err.value}`
    error = new ErrorResponse(message, 404)
  }

  // Mongoose duplication key
  if (err.code === 11000) {
    const message = "Duplicate value is not allowed"
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server error",
  })
}

module.exports = errorHandler
