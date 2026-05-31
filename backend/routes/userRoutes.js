const express = require("express");

const User = require("../models/User");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

/*
GET ALL USERS
Admin only
*/

router.get(
  "/",
  auth,
  role("admin"),
  async (req, res) => {
    try {
      const users = await User.find(
        {},
        "-password"
      );

      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/*
DELETE USER
Admin only
*/

router.delete(
  "/:id",
  auth,
  role("admin"),
  async (req, res) => {
    try {
      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "User deleted successfully",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;