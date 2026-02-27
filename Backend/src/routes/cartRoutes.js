const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} = require("../controller/cartController");

const router = express.Router();

router.use(protect);

router.get("/", getCart);
router.post("/", addToCart);
router.patch("/:courseId", updateCartItemQuantity);
router.delete("/:courseId", removeFromCart);
router.delete("/", clearCart);

module.exports = router;
