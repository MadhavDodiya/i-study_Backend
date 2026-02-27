const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controller/wishlistController");

const router = express.Router();

router.use(protect);

router.get("/", getWishlist);
router.post("/", addToWishlist);
router.delete("/:courseId", removeFromWishlist);

module.exports = router;
