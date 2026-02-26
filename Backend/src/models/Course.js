const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
    },
    hoverTitle: {
      type: String,
      default: "",
    },
    desc1: {
      type: String,
      default: "",
    },
    p1: {
      type: String,
      default: "",
    },
    p2: {
      type: String,
      default: "",
    },
    p3: {
      type: String,
      default: "",
    },
    p4: {
      type: String,
      default: "",
    },
    imageKey: {
      type: String,
      required: true,
      trim: true,
    },
    lessons: {
      type: Number,
      default: 0,
    },
    students: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    level: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "",
    },
    instructor: {
      type: String,
      default: "",
    },
    hours: {
      type: Number,
      default: 0,
    },
    priceValue: {
      type: Number,
      default: 0,
    },
    price: {
      type: String,
      default: "$0",
    },
    oldPrice: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
