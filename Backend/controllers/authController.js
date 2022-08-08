const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authController = {
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      //Create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      //Save to DB
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });

      if (!user) {
        res.status(404).json("Wrong usename!");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        res.status(400).json("Wrong password");
      }

      if (user && validPassword) {
        const accessToken = jwt.sign(
          {
            id: user.id,
            adimin: user.admin,
          },
          process.env.JWT_ACCESS_KEY,
          { expiresIn: "30s" }
        );
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = authController;
