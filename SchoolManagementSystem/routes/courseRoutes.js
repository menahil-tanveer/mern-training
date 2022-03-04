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
/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - courseId
 *         - courseName
 *         - creditHours
 *       properties:
 *          courseId:
 *           type: string
 *           description: Unique course code
 *          courseName:
 *           type: string
 *           description: Course name
 *          creditHours:
 *            type: integer
 *            description: Credit hours assigned to course
 */

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Courses API
 */

// Routes
/**
 * @swagger
 * /api/courses/:
 *   get:
 *     summary: Returns a list of all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Returns a list of all courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */

router.get(
  "/get-all-courses",
  [authenticateToken.verifyToken],
  courseController.getAllCourses
);
/**
 * @swagger
 * /api/course/{courseId}:
 *   get:
 *     summary: Fetch course with given course id
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique course code
 *     responses:
 *       200:
 *         description: Course data get by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course with given id not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/get-course/:courseId",
  [authenticateToken.verifyToken],
  courseController.getCourseById
);
/**
 * @swagger
 * /api/courses/create-new-course:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       500:
 *         description: Internal server error
 */
router.post(
  "/create-new-course",
  [authenticateToken.verifyToken, courseMiddleware.validateCourse],
  courseController.createCourse
);
/**
 * @swagger
 * /api/course/{courseId}:
 *  put:
 *    summary: Update specific course using courseId
 *    tags: [Courses]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: course id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Course'
 *    responses:
 *      200:
 *        description: Course successfully updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Course'
 *      404:
 *        description: Course not found
 *      500:
 *        description: Internal server error
 */
router.put(
  "/update-course/:courseId",
  [authenticateToken.verifyToken, courseMiddleware.validateUpdationData],
  courseController.updateCourse
);
/**
 * @swagger
 * /api/course/{courseId}:
 *   delete:
 *     summary: Delete course by courseId
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: course id
 *
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */
router.delete(
  "/delete-course/:courseId",
  [authenticateToken.verifyToken],
  courseController.deleteCourse
);

module.exports = router;
