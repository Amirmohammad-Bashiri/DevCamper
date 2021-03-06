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
const { protect, authorize } = require("../middleware/auth")

// Include other resource routers
const coursesRouter = require("./courses")
const reviewsRouter = require("./reviews")

const router = express.Router()

// Re-route into other resource routers
router.use("/:bootcampId/courses", coursesRouter)
router.use("/:bootcampId/reviews", reviewsRouter)

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius)

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp)

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp)

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload)

module.exports = router
