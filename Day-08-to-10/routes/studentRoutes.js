const express = require("express");
const router = express.Router();
const studentMiddlewares = require("../middlewares/studentMiddlewares");
const studentController = require("../controllers/studentController");
const emailJob = require("../jobs/emailJob");

router.get("/", studentController.getAllStudents);
router.post(
  "/",
  studentMiddlewares.validateStudent,
  studentController.createStudent
);
router.post("/sendRegistrationEmail", emailJob.sendEmail);
router.post("/sendRegEmailByCronJob", emailJob.scheduleEmail);

router.post("/assignCourse", studentController.assignCourse);
router.get("/:id", studentController.getStudentById);
router.delete("/:id", studentController.deleteStudent);
router.delete("/", studentController.deleteAllStudents);

// router.post(
//   "/",
//   [userMiddleware.validateUserFirstName, userMiddleware.validateUserEmail],
//   userController.getAllUsers
// );

module.exports = router;
