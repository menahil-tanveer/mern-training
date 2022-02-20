const express = require("express");
const router = express.Router();
const studentMiddlewares = require("../middlewares/studentMiddlewares");
const studentController = require("../controllers/studentController");

router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.delete("/:id", studentController.deleteStudent);
router.delete("/", studentController.deleteAllStudents);

// router.post(
//   "/",
//   [userMiddleware.validateUserFirstName, userMiddleware.validateUserEmail],
//   userController.getAllUsers
// );

module.exports = router;
