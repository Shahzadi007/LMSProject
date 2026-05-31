const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require(
  "../models/Enrollment"
);

/*
GET ANALYTICS
(Admin Only)
*/
exports.getAnalytics = async (
  req,
  res
) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalStudents =
      await User.countDocuments({
        role: "student",
      });

    const totalInstructors =
      await User.countDocuments({
        role: "instructor",
      });

    const totalCourses =
      await Course.countDocuments();

    const totalEnrollments =
      await Enrollment.countDocuments();

    res.json({
      totalUsers,
      totalStudents,
      totalInstructors,
      totalCourses,
      totalEnrollments,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};