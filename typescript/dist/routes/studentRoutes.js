"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const studentController = require("../controllers/studentController");
const studentMiddlewares = require("../middlewares/studentMiddlewares");
const emailJob = require("../jobs/emailJob");
const eventEmitter = require("../events/testEventEmitter");
// const studentMiddlewares = require("../middlewares/studentMiddlewares");
// const studentController = require("../controllers/studentController");
// const emailJob = require("../jobs/emailJob");
// const eventEmitter = require("../events/testEventEmitter");
router.get("/", studentController.getAllStudents);
router.post("/", studentMiddlewares.validateStudent, studentController.createStudent);
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
//# sourceMappingURL=studentRoutes.js.map