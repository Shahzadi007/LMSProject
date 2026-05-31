const User = require("../models/User");

exports.getUsers =
  async (req, res) => {
    try {
      const users =
        await User.find(
          {},
          "-password"
        );

      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  };

exports.deleteUser =
  async (req, res) => {
    try {
      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "User deleted",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };