const Course = require("../models/Course");


exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");

    res.json(courses);
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name email");

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      instructor: req.user.id,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    if (
      req.user.role === "instructor" &&
      course.instructor?.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You can only update your own courses",
      });
    }

    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    if (
      req.user.role === "instructor" &&
      course.instructor?.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You can only delete your own courses",
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};