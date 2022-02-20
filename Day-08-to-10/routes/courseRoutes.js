const express = require("express");
const router = express.Router();
// const studentMiddlewares = require("../middlewares/studentMiddlewares");
const courseController = require("../controllers/courseController");
router.get("/", courseController.getAllCourses);
router.delete("/", courseController.deleteAllCourses);

module.exports = router;
