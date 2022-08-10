const userController = require("../controllers/userController");
const middlerwareController = require("../controllers/middlewareController");

const router = require("express").Router();

//GET ALL USERS
router.get("/", middlerwareController.verifyToken, userController.getAllUsers);

// Delete user
router.delete(
  "/:id",
  middlerwareController.verifyTokenAndAdminAuth,
  userController.deleteUser
);

module.exports = router;
