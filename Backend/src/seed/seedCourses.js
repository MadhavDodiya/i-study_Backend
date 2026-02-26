require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("../models/Course");
const homeData = require("../data/homeData");

const seedCourses = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing in environment variables");
  }

  await mongoose.connect(mongoUri);

  const courses = (homeData.courses || []).map((course) => ({
    ...course,
    rating: Number(course.rating) || 0,
  }));

  for (const course of courses) {
    await Course.updateOne({ id: course.id }, { $set: course }, { upsert: true });
  }

  console.log(`Seed complete: ${courses.length} courses upserted`);
  await mongoose.disconnect();
};

seedCourses()
  .catch(async (error) => {
    console.error("Seed failed:", error.message);
    try {
      await mongoose.disconnect();
    } catch (_error) {}
    process.exit(1);
  });
