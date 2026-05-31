const express = require("express");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createLesson,
  getCourseLessons,
  getLesson,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");

const router = express.Router();

router.post(
  "/",
  auth,
  role("instructor", "admin"),
  createLesson
);

router.get(
  "/course/:courseId",
  getCourseLessons
);

router.get(
  "/:id",
  getLesson
);

router.put(
  "/:id",
  auth,
  role("instructor", "admin"),
  updateLesson
);

router.delete(
  "/:id",
  auth,
  role("instructor", "admin"),
  deleteLesson
);

module.exports = router;










































































































