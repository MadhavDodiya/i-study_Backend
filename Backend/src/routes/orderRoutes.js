const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createCheckoutOrder,
  getMyOrders,
  getMyOrderById,
} = require("../controller/orderController");

const router = express.Router();

router.use(protect);

router.post("/checkout", createCheckoutOrder);
router.get("/", getMyOrders);
router.get("/:id", getMyOrderById);

module.exports = router;
