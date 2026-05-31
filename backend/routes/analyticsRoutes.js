const express = require("express");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getAnalytics,
} = require("../controllers/analyticsController");

const router = express.Router();

router.get(
  "/",
  auth,
  role("admin"),
  getAnalytics
);

module.exports = router;

// const express = require("express");

// const User = require("../models/User");
// const Course = require("../models/Course");
// const Enrollment = require(
//   "../models/Enrollment"
// );

// const auth = require("../middleware/authMiddleware");
// const role = require("../middleware/roleMiddleware");

// const router = express.Router();

// router.get(
//   "/",
//   auth,
//   role("admin"),
//   async (req, res) => {
//     try {
//       const totalUsers =
//         await User.countDocuments();

//       const totalStudents =
//         await User.countDocuments({
//           role: "student",
//         });

//       const totalInstructors =
//         await User.countDocuments({
//           role: "instructor",
//         });

//       const totalCourses =
//         await Course.countDocuments();

//       const totalEnrollments =
//         await Enrollment.countDocuments();

//       res.json({
//         totalUsers,
//         totalStudents,
//         totalInstructors,
//         totalCourses,
//         totalEnrollments,
//       });
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   }
// );

// module.exports = router;
