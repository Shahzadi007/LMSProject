require("dotenv").config();

const mongoose = require("mongoose");

const Course = require("../models/Course");
const Lesson = require("../models/Lesson");

async function seedLessons() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const courses =
      await Course.find();

    await Lesson.deleteMany();

    for (const course of courses) {
      await Lesson.create({
        title: `Introduction to ${course.title}`,
        content:
          "Welcome to the course.",
        videoUrl:
          "https://youtube.com",
        course: course._id,
      });

      await Lesson.create({
        title:
          "Advanced Concepts",
        content:
          "Advanced lesson content.",
        videoUrl:
          "https://youtube.com",
        course: course._id,
      });
    }

    console.log(
      "Lessons seeded successfully"
    );

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedLessons();