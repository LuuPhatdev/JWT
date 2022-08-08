const userController = require("../controllers/userController");

const router = require("express").Router();

//GET ALL USERS
router.get("/", userController.getAllUsers);

// Delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
