const { default: mongose } = require("mongoose");
const User = require("../models/User");

const userController = {
  //Get all users
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Delete user
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete success.");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
