const Course = require("../models/Course");

// ✅ Get all courses with proper response format
const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).sort({ id: 1 });
    
    // ✅ Return in proper format
    return res.status(200).json({
      success: true,
      data: courses,
      count: courses.length,
    });
  } catch (error) {
    console.error("Get courses error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

// ✅ Get course by ID
const getCourseById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid course id" 
      });
    }

    const course = await Course.findOne({ id });

    if (!course) {
      return res.status(404).json({ 
        success: false,
        message: "Course not found" 
      });
    }

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Get course by ID error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch course",
      error: error.message,
    });
  }
};

module.exports = {
  getCourses,
  getCourseById,
};