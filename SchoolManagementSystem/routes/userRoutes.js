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
const authenticateToken = require("../middlewares/authenticateToken");
router.get(
  "/get-all-users",
  [authenticateToken.verifyToken],
  userController.getAllUsers
);
router.get("/get-all-students", userController.getAllStudents);
router.get("/get-all-teachers", userController.getAllTeachers);
router.get("/get-user/:userId", userController.getUserById);

router.post(
  "/create-new-user",
  [userMiddleware.validateUser],
  userController.createUser
);
router.post("/assign-course", userController.assignCourse),
  router.put(
    "/update-user/:userId",
    [userMiddleware.validateUpdationData],
    userController.updateUser
  );
router.delete("/delete-user/:userId", userController.deleteUser);
router.post("/login", userController.login);

module.exports = router;
