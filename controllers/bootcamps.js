const Bootcamp = require("../models/Bootcamp")
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/ascync")

// @desc      Get all bootcamps
// @rotue     GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find()

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  })
})

// @desc      Get single bootcamp
// @rotue     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp could not be found with the id of ${req.params.id}`,
        404
      )
    )
  }

  res.status(200).json({ success: true, data: bootcamp })
})

// @desc      Create Bootcamp
// @rotue     POST /api/v1/bootcamps
// @access    Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body)

  res.status(201).json({
    success: true,
    data: bootcamp,
  })
})

// @desc      Update Bootcamp
// @rotue     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp could not be found with the id of ${req.params.id}`,
        404
      )
    )
  }
  res.status(200).json({ success: true, data: bootcamp })
})

// @desc      Delete Bootcamp
// @rotue     DELETE /api/v1/bootcamps/:id
// @access    Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp could not be found with the id of ${req.params.id}`,
        404
      )
    )
  }

  res.status(200).json({ success: true, data: {} })
})
