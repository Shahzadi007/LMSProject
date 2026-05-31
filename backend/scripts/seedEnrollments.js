require("dotenv").config();

const mongoose = require("mongoose");

const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require(
  "../models/Enrollment"
);

async function seedEnrollments() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const student =
      await User.findOne({
        role: "student",
      });

    const courses =
      await Course.find();

    await Enrollment.deleteMany();

    for (const course of courses) {
      await Enrollment.create({
        student:
          student._id,
        course:
          course._id,
        progress: 0,
      });
    }

    console.log(
      "Enrollments seeded"
    );

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedEnrollments();