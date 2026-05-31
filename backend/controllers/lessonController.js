const mongoose = require("mongoose");
const Lesson = require("../models/Lesson");
const Course = require("../models/Course");


exports.createLesson = async (req, res) => {
  try {
    const {
      title,
      content,
      videoUrl,
      courseId,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        message: "Invalid course ID",
      });
    }

    const course = await Course.findById(courseId);

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
        message: "You can only add lessons to your own courses",
      });
    }

    const lesson = await Lesson.create({
      title,
      content,
      videoUrl,
      course: courseId,
    });

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.getCourseLessons = async (
  req,
  res
) => {
  try {
    const lessons =
      await Lesson.find({
        course: req.params.courseId,
      });

    res.json(lessons);
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate({
      path: "course",
      select: "title instructor",
      populate: {
        path: "instructor",
        select: "name",
      },
    });

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }

    res.json(lesson);
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.updateLesson = async (
  req,
  res
) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }

    const course = await Course.findById(lesson.course);

    if (!course) {
      return res.status(404).json({
        message: "Associated course not found",
      });
    }

    if (
      req.user.role === "instructor" &&
      course.instructor?.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You can only update lessons for your own courses",
      });
    }

    const updated = await Lesson.findByIdAndUpdate(
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


exports.deleteLesson = async (
  req,
  res
) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }

    const course = await Course.findById(lesson.course);

    if (!course) {
      return res.status(404).json({
        message: "Associated course not found",
      });
    }

    if (
      req.user.role === "instructor" &&
      course.instructor?.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You can only delete lessons for your own courses",
      });
    }

    await Lesson.findByIdAndDelete(req.params.id);

    res.json({
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

