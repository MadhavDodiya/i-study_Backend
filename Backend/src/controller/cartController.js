const Cart = require("../models/Cart");
const Course = require("../models/Course");

const normalizeCartResponse = (cartItems, coursesById) => {
  const items = cartItems
    .map((entry) => {
      const course = coursesById.get(entry.courseId);
      if (!course) return null;

      const unitPrice = Number(course.priceValue) || 0;
      const quantity = Number(entry.quantity) || 1;

      return {
        courseId: entry.courseId,
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

    const courseIds = [...new Set(cartItems.map((item) => Number(item.courseId)))];
    const courses = await Course.find({ id: { $in: courseIds } }).lean();
    const coursesById = new Map(courses.map((course) => [Number(course.id), course]));

    return res.status(200).json(normalizeCartResponse(cartItems, coursesById));
  } catch (error) {
    return next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const courseId = Number(req.body.courseId);
    const quantity = Number(req.body.quantity ?? 1);

    if (!Number.isInteger(courseId) || courseId <= 0) {
      return res.status(400).json({ message: "invalid course id" });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "quantity must be greater than 0" });
    }

    const course = await Course.findOne({ id: courseId }).lean();
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

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
    const courseId = Number(req.params.courseId);
    const quantity = Number(req.body.quantity);

    if (!Number.isInteger(courseId) || courseId <= 0) {
      return res.status(400).json({ message: "invalid course id" });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "quantity must be greater than 0" });
    }

    const item = await Cart.findOne({ userId, courseId });
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
    const courseId = Number(req.params.courseId);

    if (!Number.isInteger(courseId) || courseId <= 0) {
      return res.status(400).json({ message: "invalid course id" });
    }

    await Cart.deleteOne({ userId, courseId });
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
