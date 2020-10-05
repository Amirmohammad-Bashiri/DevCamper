const Bootcamp = require("../models/Bootcamp")

// @desc      Get all bootcamps
// @rotue     GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.find()

    res.status(200).json({ success: true, data: bootcamps })
  } catch (err) {
    res.status(400).json({ success: false })
  }
}

// @desc      Get single bootcamp
// @rotue     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id)

    if (!bootcamp) {
      return res.status(400).json({ success: false })
    }

    res.status(200).json({ success: true, data: bootcamp })
  } catch (err) {
    res.status(400).json({ success: false })
  }
}

// @desc      Create Bootcamp
// @rotue     POST /api/v1/bootcamps
// @access    Private
exports.createBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.create(req.body)

    res.status(201).json({
      success: true,
      data: bootcamp,
    })
  } catch (err) {
    res.status(400).json({ success: false })
  }
}

// @desc      Update Bootcamp
// @rotue     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Update bootcamp ${req.params.id}`,
  })
}

// @desc      Delete Bootcamp
// @rotue     DELETE /api/v1/bootcamps/:id
// @access    Private
exports.deleteBootcamp = (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Delete bootcamp ${req.params.id}`,
  })
}
