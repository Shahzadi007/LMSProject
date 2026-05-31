require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // check existing users
    const existing = await User.find();

    if (existing.length > 0) {
      console.log("Users already exist");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.insertMany([
      {
        name: "Admin User",
        email: "admin@lms.com",
        password: hashedPassword,
        role: "admin",
      },
      {
        name: "Instructor User",
        email: "instructor@lms.com",
        password: hashedPassword,
        role: "instructor",
      },
      {
        name: "Student User",
        email: "student@lms.com",
        password: hashedPassword,
        role: "student",
      },
    ]);

    console.log("All demo users created successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedUsers();