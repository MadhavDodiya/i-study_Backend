const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    courseId: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
  },
  { timestamps: true }
);

wishlistSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model("Wishlist", wishlistSchema);
