// @desc      Get all bootcamps
// @rotue     GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: "Show all bootcamps" })
}

// @desc      Get single bootcamp
// @rotue     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Show bootcamp ${req.params.id}`,
  })
}

// @desc      Create Bootcamp
// @rotue     POST /api/v1/bootcamps
// @access    Private
exports.createBootcamp = (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: "Create new bootcamp" })
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
