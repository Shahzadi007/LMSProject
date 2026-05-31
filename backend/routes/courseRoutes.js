const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const router = express.Router();

router.get("/", getCourses);

router.post(
  "/",
  auth,
  role("instructor", "admin"),
  createCourse
);

router.get("/:id", getCourse);

router.put(
  "/:id",
  auth,
  role("instructor", "admin"),
  updateCourse
);

router.delete(
  "/:id",
  auth,
  role("instructor", "admin"),
  deleteCourse
);

module.exports = router;


// const express = require("express");
// const Course = require("../models/Course");
// const auth = require("../middleware/authMiddleware");
// const role = require("../middleware/roleMiddleware");

// const router = express.Router();

// router.get("/", async(req,res)=>{
//   const courses = await Course.find();
//   res.json(courses);
// });

// router.post("/", auth, role("instructor","admin"), async(req,res)=>{
//   const course = await Course.create(req.body);
//   res.status(201).json(course);
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const course =
//       await Course.findById(req.params.id)
//         .populate(
//           "instructor",
//           "name email"
//         );

//     if (!course) {
//       return res.status(404).json({
//         message: "Course not found",
//       });
//     }

//     res.json(course);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
// router.put(
//   "/:id",
//   auth,
//   role("instructor", "admin"),
//   async (req, res) => {
//     try {
//       const course =
//         await Course.findById(req.params.id);

//       if (!course) {
//         return res.status(404).json({
//           message: "Course not found",
//         });
//       }

//       if (
//         req.user.role === "instructor" &&
//         course.instructor?.toString() !==
//           req.user.id
//       ) {
//         return res.status(403).json({
//           message:
//             "You can only update your own courses",
//         });
//       }

//       const updated =
//         await Course.findByIdAndUpdate(
//           req.params.id,
//           req.body,
//           {
//             new: true,
//           }
//         );

//       res.json(updated);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   }
// );

// router.delete(
//   "/:id",
//   auth,
//   role("instructor", "admin"),
//   async (req, res) => {
//     try {
//       const course =
//         await Course.findById(req.params.id);

//       if (!course) {
//         return res.status(404).json({
//           message: "Course not found",
//         });
//       }

//       if (
//         req.user.role === "instructor" &&
//         course.instructor?.toString() !==
//           req.user.id
//       ) {
//         return res.status(403).json({
//           message:
//             "You can only delete your own courses",
//         });
//       }

//       await Course.findByIdAndDelete(
//         req.params.id
//       );

//       res.json({
//         message:
//           "Course deleted successfully",
//       });
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   }
// );


// module.exports = router;