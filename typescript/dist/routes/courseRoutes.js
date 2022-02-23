"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
router.get("/", courseController.getAllCourses);
router.delete("/", courseController.deleteAllCourses);
module.exports = router;
//# sourceMappingURL=courseRoutes.js.map