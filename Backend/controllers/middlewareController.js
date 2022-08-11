const jwt = require("jsonwebtoken");

const middlewareController = {
  //verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.token;

    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
<<<<<<< HEAD
        return res.status(403).json("Token is not valid");
=======
          res.status(403).json("Token is not valid");
>>>>>>> 8b19bee6965049a0c55ff0e2c18f795fc052bba4
        }
        res.user = user;
        next();
      });
    } else {
<<<<<<< HEAD
      return res.status(401).json("you are not authenticated");
=======
      res.status(401).json("you are not authenticated");
>>>>>>> 8b19bee6965049a0c55ff0e2c18f795fc052bba4
    }
  },

  verifyTokenAndAdminAuth: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.admin) {
        console.log(req.user.id)
        next();
      } else {
<<<<<<< HEAD
        return res.status(403).json("You're not allowed to delete others");
=======
        res.status(403).json("You're not allowed to delete others");
>>>>>>> 8b19bee6965049a0c55ff0e2c18f795fc052bba4
      }
    });
  },
};

module.exports = middlewareController;
