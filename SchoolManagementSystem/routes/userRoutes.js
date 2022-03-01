/**
 *
 * Author: Menahil
 * Created: 28-02-2022
 * Purpose: This file contains all the routes for users
 *
 */
const express = require("express");
const router = express.Router();
const userMiddleware = require("../middlewares/userMiddleware");
const userController = require("../controllers/userController");
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getAllStudents", userController.getAllStudents);
router.get("/getAllTeachers", userController.getAllTeachers);
router.post(
  "/createNewUser",
  [userMiddleware.validateUser],
  userController.createUser
);

module.exports = router;
