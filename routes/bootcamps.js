const express = require("express")
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps")

const Bootcamp = require("../models/Bootcamp")
const advancedResults = require("../middleware/advancedResults")

// Route protection
const { protect } = require("../middleware/auth")

// Include other resource routers
const coursesRouter = require("./courses")

const router = express.Router()

// Re-route into other resource routers
router.use("/:bootcampId/courses", coursesRouter)

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius)

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, createBootcamp)

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp)

router.route("/:id/photo").put(protect, bootcampPhotoUpload)

module.exports = router
