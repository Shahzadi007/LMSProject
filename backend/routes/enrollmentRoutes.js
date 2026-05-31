const express = require("express");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  enrollCourse,
  getMyCourses,
} = require("../controllers/enrollmentController");

const router = express.Router();

/*
POST /api/enroll
*/
router.post(
  "/",
  auth,
  role("student"),
  enrollCourse
);

/*
GET /api/enroll/my-courses
*/
router.get(
  "/my-courses",
  auth,
  role("student"),
  getMyCourses
);

module.exports = router;


// const express = require("express");

// const Enrollment = require("../models/Enrollment");
// const Course = require("../models/Course");

// const auth = require("../middleware/authMiddleware");
// const role = require("../middleware/roleMiddleware");

// const router = express.Router();

// /*
// POST /api/enroll
// Student enrolls
// */

// router.post(
//   "/",
//   auth,
//   role("student"),
//   async (req, res) => {
//     try {
//       const { courseId } = req.body;

//       const course = await Course.findById(
//         courseId
//       );

//       if (!course) {
//         return res.status(404).json({
//           message: "Course not found",
//         });
//       }

//       const alreadyEnrolled =
//         await Enrollment.findOne({
//           student: req.user.id,
//           course: courseId,
//         });

//       if (alreadyEnrolled) {
//         return res.status(400).json({
//           message:
//             "Already enrolled in course",
//         });
//       }

//       const enrollment =
//         await Enrollment.create({
//           student: req.user.id,
//           course: courseId,
//         });

//       res.status(201).json(enrollment);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   }
// );

// /*
// GET /api/enroll/my-courses
// */

// router.get(
//   "/my-courses",
//   auth,
//   role("student"),
//   async (req, res) => {
//     try {
//       const courses =
//         await Enrollment.find({
//           student: req.user.id,
//         })
//           .populate("course")
//           .populate(
//             "student",
//             "name email"
//           );

//       res.json(courses);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   }
// );

// module.exports = router;