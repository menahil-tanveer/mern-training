const express = require("express");
const router = express.Router();
// const studentMiddlewares = require("../middlewares/studentMiddlewares");
const teacherController = require("../controllers/teacherController");
router.get("/", teacherController.getAllTeachers);
module.exports = router;
