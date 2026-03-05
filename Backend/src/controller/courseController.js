const Course = require("../models/Course");
const mongoose = require("mongoose");

const allowedLevels = new Set(["beginner", "intermediate", "advanced"]);

const buildCourseSelector = (rawId) => {
  const id = String(rawId || "").trim();
  if (!id) return null;

  if (mongoose.isValidObjectId(id)) {
    return { _id: id };
  }

  const numericId = Number(id);
  if (Number.isInteger(numericId) && numericId > 0) {
    return { id: numericId };
  }

  return null;
};

const normalizeImageKey = (value) => {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^\/?uploads\//i.test(trimmed)) {
    return `/${trimmed.replace(/^\/+/, "")}`;
  }
  return trimmed
    .toLowerCase()
    .replace(/^.*[\\/]/, "")
    .replace(/\.[a-z0-9]+$/i, "");
};

const validateCoursePayload = (payload, { isUpdate = false, uploadedImagePath = "" } = {}) => {
  const errors = [];
  const data = {};

  const requireString = (field, label) => {
    const value = payload[field];
    if (typeof value !== "string" || !value.trim()) {
      errors.push(`${label} is required`);
      return;
    }
    data[field] = value.trim();
  };

  const optionalString = (field, { min = 0 } = {}) => {
    if (payload[field] === undefined) return;
    if (typeof payload[field] !== "string") {
      errors.push(`${field} must be a string`);
      return;
    }
    const value = payload[field].trim();
    if (value.length < min) {
      errors.push(`${field} must be at least ${min} characters`);
      return;
    }
    data[field] = value;
  };

  const optionalNumber = (field, { min } = {}) => {
    if (payload[field] === undefined) return;
    const num = Number(payload[field]);
    if (!Number.isFinite(num)) {
      errors.push(`${field} must be a valid number`);
      return;
    }
    if (min !== undefined && num < min) {
      errors.push(`${field} must be >= ${min}`);
      return;
    }
    data[field] = num;
  };

  if (!isUpdate) {
    requireString("title", "title");
    requireString("desc", "desc");
  }

  optionalString("title", { min: 1 });
  optionalString("desc", { min: 1 });
  optionalString("hoverTitle");
  optionalString("desc1");
  optionalString("p1");
  optionalString("p2");
  optionalString("p3");
  optionalString("p4");
  optionalString("category");
  optionalString("language");
  optionalString("instructor");
  optionalString("oldPrice");
  optionalString("price");

  if (payload.imageKey !== undefined || uploadedImagePath || !isUpdate) {
    const imageKey = normalizeImageKey(uploadedImagePath || payload.imageKey);
    if (!imageKey) {
      errors.push("imageKey is required");
    } else if (
      !/^course\d+$/i.test(imageKey) &&
      !/^\/uploads\//i.test(imageKey) &&
      !/^https?:\/\//i.test(imageKey)
    ) {
      errors.push("imageKey must be like course1, /uploads/... or http(s) URL");
    } else {
      data.imageKey = imageKey;
    }
  }

  if (payload.level !== undefined) {
    if (typeof payload.level !== "string" || !payload.level.trim()) {
      errors.push("level must be a non-empty string");
    } else {
      const level = payload.level.trim();
      if (!allowedLevels.has(level.toLowerCase())) {
        errors.push("level must be Beginner, Intermediate, or Advanced");
      } else {
        data.level = level;
      }
    }
  }

  optionalNumber("lessons", { min: 0 });
  optionalNumber("students", { min: 0 });
  optionalNumber("hours", { min: 0 });
  optionalNumber("priceValue", { min: 0 });
  optionalNumber("rating", { min: 0 });

  if (data.rating !== undefined && data.rating > 5) {
    errors.push("rating must be <= 5");
  }

  if (isUpdate && Object.keys(data).length === 0) {
    errors.push("No valid fields provided for update");
  }

  return { errors, data };
};

// ===============================
// GET ALL COURSES
// ===============================
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET SINGLE COURSE BY ID
// ===============================
exports.getCourseById = async (req, res) => {
  try {
    const selector = buildCourseSelector(req.params.id);
    if (!selector) {
      return res.status(400).json({
        success: false,
        message: "Invalid course id",
      });
    }

    const course = await Course.findOne(selector);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// CREATE COURSE
// ===============================
exports.createCourse = async (req, res) => {
  try {
    const uploadedImagePath = req.file ? `/uploads/courses/${req.file.filename}` : "";
    const { errors, data } = validateCoursePayload(req.body, {
      isUpdate: false,
      uploadedImagePath,
    });
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const course = await Course.create(data);

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(error.errors).map((item) => item.message),
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// UPDATE COURSE
// ===============================
exports.updateCourse = async (req, res) => {
  try {
    const uploadedImagePath = req.file ? `/uploads/courses/${req.file.filename}` : "";
    const { errors, data } = validateCoursePayload(req.body, {
      isUpdate: true,
      uploadedImagePath,
    });
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const selector = buildCourseSelector(req.params.id);
    if (!selector) {
      return res.status(400).json({
        success: false,
        message: "Invalid course id",
      });
    }

    const course = await Course.findOneAndUpdate(
      selector,
      data,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(error.errors).map((item) => item.message),
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE COURSE
// ===============================
exports.deleteCourse = async (req, res) => {
  try {
    const selector = buildCourseSelector(req.params.id);
    if (!selector) {
      return res.status(400).json({
        success: false,
        message: "Invalid course id",
      });
    }

    const course = await Course.findOneAndDelete(selector);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
