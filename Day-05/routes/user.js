const express = require("express");
const router = express.Router();
const userMiddleware = require("../middlewares/user");
const userController = require("../controllers/user");
// router.get("/", userController.getAllUsers);
router.post(
  "/",
  [userMiddleware.validateUserFirstName, userMiddleware.validateUserEmail],
  userController.getAllUsers
);

module.exports = router;
