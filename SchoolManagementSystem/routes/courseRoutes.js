/**
 *
 * Author: Menahil
 * Created: 02-02-2022
 * Purpose: This file contains all the routes for courses
 *
 */
const express = require("express");
const router = express.Router();
const courseMiddleware = require("../middlewares/courseMiddleware");
const courseController = require("../controllers/courseController");
const authenticateToken = require("../middlewares/authenticateToken");
router.get(
  "/get-all-courses",
  [authenticateToken.verifyToken],
  courseController.getAllCourses
);
router.get(
  "/get-course/:courseId",
  [authenticateToken.verifyToken],
  courseController.getCourseById
);

router.post(
  "/create-new-course",
  [courseMiddleware.validateCourse, authenticateToken.verifyToken],
  courseController.createCourse
);
  router.put(
    "/update-course/:courseId",
    [courseMiddleware.validateUpdationData, authenticateToken.verifyToken],
    courseController.updateCourse
  );

router.delete(
  "/delete-course/:courseId",
  [authenticateToken.verifyToken],
  courseController.deleteCourse
);

module.exports = router;
