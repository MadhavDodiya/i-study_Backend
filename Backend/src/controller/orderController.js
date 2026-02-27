const Cart = require("../models/Cart");
const Course = require("../models/Course");
const Order = require("../models/Order");

const TAX_RATE = 0.1;

const normalizeAmount = (value) => Math.round(Number(value) * 100) / 100;

const createCheckoutOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { firstName, lastName, email, phone, country, city, address, note = "" } = req.body || {};

    if (!firstName || !lastName || !email || !phone || !country || !city || !address) {
      return res.status(400).json({ message: "all required billing fields must be provided" });
    }

    const cartItems = await Cart.find({ userId }).lean();
    if (cartItems.length === 0) {
      return res.status(400).json({ message: "cart is empty" });
    }

    const courseIds = [...new Set(cartItems.map((item) => Number(item.courseId)))];
    const courses = await Course.find({ id: { $in: courseIds } }).lean();
    const coursesById = new Map(courses.map((course) => [Number(course.id), course]));

    const orderItems = cartItems
      .map((entry) => {
        const course = coursesById.get(Number(entry.courseId));
        if (!course) return null;

        const unitPrice = Number(course.priceValue) || 0;
        const quantity = Number(entry.quantity) || 1;

        return {
          courseId: Number(entry.courseId),
          title: course.title,
          imageKey: course.imageKey || "",
          unitPrice,
          quantity,
          lineTotal: normalizeAmount(unitPrice * quantity),
        };
      })
      .filter(Boolean);

    if (orderItems.length === 0) {
      return res.status(400).json({ message: "no valid cart items found for checkout" });
    }

    const subtotal = normalizeAmount(orderItems.reduce((sum, item) => sum + item.lineTotal, 0));
    const tax = normalizeAmount(subtotal * TAX_RATE);
    const total = normalizeAmount(subtotal + tax);

    const order = await Order.create({
      userId,
      items: orderItems,
      subtotal,
      tax,
      total,
      billing: {
        firstName,
        lastName,
        email: String(email).toLowerCase(),
        phone,
        country,
        city,
        address,
        note,
      },
      status: "placed",
    });

    await Cart.deleteMany({ userId });

    return res.status(201).json({
      message: "order placed successfully",
      order: {
        id: order._id,
        items: order.items,
        subtotal: order.subtotal,
        tax: order.tax,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .select("-billing")
      .lean();

    return res.status(200).json({ orders });
  } catch (error) {
    return next(error);
  }
};

const getMyOrderById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orderId = req.params.id;

    const order = await Order.findOne({ _id: orderId, userId }).lean();
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    return res.status(200).json({ order });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createCheckoutOrder,
  getMyOrders,
  getMyOrderById,
};
