const Wishlist = require("../models/Wishlist");
const Course = require("../models/Course");

const buildWishlistResponse = (wishlistItems, coursesById) => {
  return wishlistItems
    .map((entry) => {
      const course = coursesById.get(entry.courseId);
      if (!course) return null;
      return {
        courseId: entry.courseId,
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

    const courseIds = [...new Set(wishlistItems.map((item) => Number(item.courseId)))];
    const courses = await Course.find({ id: { $in: courseIds } }).lean();
    const coursesById = new Map(courses.map((course) => [Number(course.id), course]));

    return res.status(200).json({ items: buildWishlistResponse(wishlistItems, coursesById) });
  } catch (error) {
    return next(error);
  }
};

const addToWishlist = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const courseId = Number(req.body.courseId);

    if (!Number.isInteger(courseId) || courseId <= 0) {
      return res.status(400).json({ message: "invalid course id" });
    }

    const course = await Course.findOne({ id: courseId }).lean();
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    await Wishlist.updateOne({ userId, courseId }, { $setOnInsert: { userId, courseId } }, { upsert: true });
    return getWishlist(req, res, next);
  } catch (error) {
    return next(error);
  }
};

const removeFromWishlist = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const courseId = Number(req.params.courseId);

    if (!Number.isInteger(courseId) || courseId <= 0) {
      return res.status(400).json({ message: "invalid course id" });
    }

    await Wishlist.deleteOne({ userId, courseId });
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
