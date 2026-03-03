const express = require("express");
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require("../controller/courseController");
const { protect, admin } = require("../middleware/authMiddleware");
const uploadCourseImage = require("../middleware/uploadCourseImage");

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", protect, admin, uploadCourseImage.single("image"), createCourse);
router.put("/:id", protect, admin, uploadCourseImage.single("image"), updateCourse);
router.delete("/:id", protect, admin, deleteCourse);

module.exports = router;
