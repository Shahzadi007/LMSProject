require("dotenv").config();

const mongoose = require("mongoose");

const User = require("../models/User");
const Course = require("../models/Course");

async function seedCourses() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const instructor = await User.findOne({
      role: "instructor",
    });

    if (!instructor) {
      console.log(
        "Instructor not found"
      );
      process.exit();
    }

    await Course.deleteMany();

    await Course.insertMany([
      {
        title: "React JS Complete Guide",
        description:
          "Learn React from beginner to advanced.",
        category: "Frontend",
        price: 100,
        instructor:
          instructor._id,
      },
      {
        title:
          "Node.js Backend Development",
        description:
          "Build scalable APIs using Express.",
        category: "Backend",
        price: 120,
        instructor:
          instructor._id,
      },
      {
        title:
          "MongoDB Masterclass",
        description:
          "Learn MongoDB and Mongoose.",
        category: "Database",
        price: 90,
        instructor:
          instructor._id,
      },
    ]);

    console.log(
      "Courses seeded successfully"
    );

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedCourses();