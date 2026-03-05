const Wishlist = require("../models/Wishlist");
const Course = require("../models/Course");
const mongoose = require("mongoose");

const normalizeCourseIdInput = (value) => String(value || "").trim();

const findCourseByInputId = async (rawCourseId) => {
  if (mongoose.isValidObjectId(rawCourseId)) {
    const byObjectId = await Course.findById(rawCourseId).lean();
    if (byObjectId) return byObjectId;
  }

  const numericId = Number(rawCourseId);
  if (Number.isInteger(numericId) && numericId > 0) {
    return Course.findOne({ id: numericId }).lean();
  }

  return null;
};

const resolveCanonicalCourseId = async (rawCourseId) => {
  const course = await findCourseByInputId(rawCourseId);
  if (!course) return null;
  return String(course._id);
};

const findCoursesForWishlistItems = async (wishlistItems) => {
  const objectIds = [];
  const numericIds = [];

  for (const item of wishlistItems) {
    const courseId = String(item.courseId || "").trim();
    if (!courseId) continue;
    if (mongoose.isValidObjectId(courseId)) {
      objectIds.push(new mongoose.Types.ObjectId(courseId));
      continue;
    }
    const numericId = Number(courseId);
    if (Number.isInteger(numericId) && numericId > 0) {
      numericIds.push(numericId);
    }
  }

  const query = [];
  if (objectIds.length > 0) query.push({ _id: { $in: objectIds } });
  if (numericIds.length > 0) query.push({ id: { $in: numericIds } });
  if (query.length === 0) return [];

  return Course.find({ $or: query }).lean();
};

const buildWishlistResponse = (wishlistItems, coursesById) => {
  return wishlistItems
    .map((entry) => {
      const course = coursesById.get(String(entry.courseId));
      if (!course) return null;
      return {
        courseId: String(entry.courseId),
        course,
      };
    })
    .filter(Boolean);
};

const getWishlist = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const wishlistItems = await Wishlist.find({ userId }).lean();

    if (wishlistItems.length === 0) {
      return res.status(200).json({ items: [] });
    }

    const courses = await findCoursesForWishlistItems(wishlistItems);
    const coursesById = new Map();
    for (const course of courses) {
      coursesById.set(String(course._id), course);
      if (course.id !== undefined && course.id !== null) {
        coursesById.set(String(course.id), course);
      }
    }

    return res.status(200).json({ items: buildWishlistResponse(wishlistItems, coursesById) });
  } catch (error) {
    return next(error);
  }
};

const addToWishlist = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const incomingCourseId = normalizeCourseIdInput(req.body.courseId);

    if (!incomingCourseId) {
      return res.status(400).json({ message: "invalid course id" });
    }

    const course = await findCourseByInputId(incomingCourseId);
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    const courseId = String(course._id);
    await Wishlist.updateOne({ userId, courseId }, { $setOnInsert: { userId, courseId } }, { upsert: true });
    return getWishlist(req, res, next);
  } catch (error) {
    return next(error);
  }
};

const removeFromWishlist = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const incomingCourseId = normalizeCourseIdInput(req.params.courseId);

    if (!incomingCourseId) {
      return res.status(400).json({ message: "invalid course id" });
    }

    const canonicalCourseId = await resolveCanonicalCourseId(incomingCourseId);
    if (!canonicalCourseId) {
      return res.status(404).json({ message: "course not found" });
    }

    await Wishlist.deleteOne({ userId, courseId: canonicalCourseId });
    return getWishlist(req, res, next);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
