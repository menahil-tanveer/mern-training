/**
 *
 * Author: Menahil
 * Created: 02-02-2022
 * Purpose: This file contains all the routes for grades
 *
 */
const express = require("express");
const router = express.Router();
const gradeMiddleware = require("../middlewares/gradeMiddleware");
const gradeController = require("../controllers/gradeController");
const authenticateToken = require("../middlewares/authenticateToken");
/**
 * @swagger
 * components:
 *   schemas:
 *     Grade:
 *       type: object
 *       required:
 *         - id
 *         - userId
 *         - courseId
 *         - grade
 *       properties:
 *          id:
 *           type: integer
 *           description: auto generated id
 *          userId:
 *           type: string
 *           description: unique user id
 *          courseId:
 *           type: string
 *           description: unique course id
 *          grade:
 *           type: string
 *           description: assigned grade
 *       example:
 *         id: 1
 *         userId:  SP22-BCS-001
 *         courseId: ECA001
 *         grade: A+
 */
/**
 * @swagger
 * /api/grades/assign-grade:
 *   post:
 *     summary: Assign grade to a student
 *     tags: [Grades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grade'
 *     responses:
 *       200:
 *         description: Grade successfully assigned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       500:
 *         description: Internal server error
 */
router.post(
  "/assign-grade",
  [authenticateToken.verifyToken, gradeMiddleware.validate],
  gradeController.assignGrade
);
/**
 * @swagger
 * /api/update-grade/:
 *  put:
 *    summary: Update grade
 *    tags: [Grades]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Grade'
 *    responses:
 *      200:
 *        description: Grade updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Grade'
 *      404:
 *        description: Entity not found
 *      500:
 *        description: Internal server error
 */
router.put(
  "/update-grade",
  [authenticateToken.verifyToken],
  gradeController.updateGrade
);
/**
 * @swagger
 * /api/delete-grade/
 *  delete:
 *    summary: Delete grade
 *    tags: [Grades]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Grade'
 *    responses:
 *       200:
 *         description: Grade deleted successfully
 *       404:
 *         description: Not found
 */
router.delete(
  "/remove-grade",
  [authenticateToken.verifyToken],
  gradeController.deleteGrade
);

module.exports = router;
