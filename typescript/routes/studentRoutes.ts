import express, { Request, Response } from "express";
const router = express.Router();
import studentController = require("../controllers/studentController");
import studentMiddlewares = require("../middlewares/studentMiddlewares");
import emailJob = require("../jobs/emailJob");
import eventEmitter = require("../events/testEventEmitter");


// const studentMiddlewares = require("../middlewares/studentMiddlewares");
// const studentController = require("../controllers/studentController");
// const emailJob = require("../jobs/emailJob");
// const eventEmitter = require("../events/testEventEmitter");

router.get("/", studentController.getAllStudents);
router.post(
  "/",
  studentMiddlewares.validateStudent,
  studentController.createStudent
);
router.post("/sendRegistrationEmail", emailJob.sendEmail);
router.post("/sendRegEmailByCronJob", emailJob.scheduleEmail);
router.post("/testEventEmitter", eventEmitter.testEvent);

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
