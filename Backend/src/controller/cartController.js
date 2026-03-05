const Cart = require("../models/Cart");
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

const findCoursesForCartItems = async (cartItems) => {
  const objectIds = [];
  const numericIds = [];

  for (const item of cartItems) {
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

const normalizeCartResponse = (cartItems, coursesById) => {
  const items = cartItems
    .map((entry) => {
      const course = coursesById.get(String(entry.courseId));
      if (!course) return null;

      const unitPrice = Number(course.priceValue) || 0;
      const quantity = Number(entry.quantity) || 1;

      return {
        courseId: String(entry.courseId),
        quantity,
        unitPrice,
        lineTotal: unitPrice * quantity,
        course,
      };
    })
    .filter(Boolean);

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  return { items, subtotal };
};

const getCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cartItems = await Cart.find({ userId }).lean();

    if (cartItems.length === 0) {
      return res.status(200).json({ items: [], subtotal: 0 });
    }

    const courses = await findCoursesForCartItems(cartItems);
    const coursesById = new Map();
    for (const course of courses) {
      coursesById.set(String(course._id), course);
      if (course.id !== undefined && course.id !== null) {
        coursesById.set(String(course.id), course);
      }
    }

    return res.status(200).json(normalizeCartResponse(cartItems, coursesById));
  } catch (error) {
    return next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const incomingCourseId = normalizeCourseIdInput(req.body.courseId);
    const quantity = Number(req.body.quantity ?? 1);

    if (!incomingCourseId) {
      return res.status(400).json({ message: "invalid course id" });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "quantity must be greater than 0" });
    }

    const course = await findCourseByInputId(incomingCourseId);
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    const courseId = String(course._id);
    const existing = await Cart.findOne({ userId, courseId });
    if (existing) {
      existing.quantity += quantity;
      await existing.save();
    } else {
      await Cart.create({ userId, courseId, quantity });
    }

    return getCart(req, res, next);
  } catch (error) {
    return next(error);
  }
};

const updateCartItemQuantity = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const incomingCourseId = normalizeCourseIdInput(req.params.courseId);
    const quantity = Number(req.body.quantity);

    if (!incomingCourseId) {
      return res.status(400).json({ message: "invalid course id" });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "quantity must be greater than 0" });
    }

    const canonicalCourseId = await resolveCanonicalCourseId(incomingCourseId);
    if (!canonicalCourseId) {
      return res.status(404).json({ message: "course not found" });
    }

    const item = await Cart.findOne({ userId, courseId: canonicalCourseId });
    if (!item) {
      return res.status(404).json({ message: "cart item not found" });
    }

    item.quantity = quantity;
    await item.save();

    return getCart(req, res, next);
  } catch (error) {
    return next(error);
  }
};

const removeFromCart = async (req, res, next) => {
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

    await Cart.deleteOne({ userId, courseId: canonicalCourseId });
    return getCart(req, res, next);
  } catch (error) {
    return next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    await Cart.deleteMany({ userId });
    return res.status(200).json({ items: [], subtotal: 0 });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
};
