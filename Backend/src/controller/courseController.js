const Course = require("../models/Course");

const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().sort({ id: 1 });
    return res.status(200).json(courses);
  } catch (error) {
    return next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "invalid course id" });
    }

    const course = await Course.findOne({ id });

    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    return res.status(200).json(course);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCourses,
  getCourseById,
};
