const express = require("express");
const router = express.Router();
import courseController = require("../controllers/courseController");
router.get("/", courseController.getAllCourses);
router.delete("/", courseController.deleteAllCourses);

module.exports = router;
