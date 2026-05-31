const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");


exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const alreadyEnrolled =
      await Enrollment.findOne({
        student: req.user.id,
        course: courseId,
      });

    if (alreadyEnrolled) {
      return res.status(400).json({
        message: "Already enrolled in course",
      });
    }

    const enrollment =
      await Enrollment.create({
        student: req.user.id,
        course: courseId,
      });

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.getMyCourses = async (req, res) => {
  try {
    const courses =
      await Enrollment.find({
        student: req.user.id,
      })
        .populate({
          path: "course",
          populate: {
            path: "instructor",
            select: "name email",
          },
        })
        .populate(
          "student",
          "name email"
        );

    res.json(courses);
  } catch (error) {
    res.status(500).json(error);
  }
};