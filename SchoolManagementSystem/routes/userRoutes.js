/**
 *
 * Author: Menahil
 * Created: 28-02-2022
 * Purpose: This file contains all the routes for users
 *
 */
const express = require("express");
const router = express.Router();
const userMiddleware = require("../middlewares/userMiddleware");
const userController = require("../controllers/userController");
const authenticateToken = require("../middlewares/authenticateToken");
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userId
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *          userId:
 *           type: string
 *           description: Self assigned unique id for user
 *          firstName:
 *           type: string
 *           description: First name of user. Must be at least 2 charcters long
 *          lastName:
 *           type: string
 *           description: Last name of user. Must be at least 2 charcters long
 *          email:
 *           type: string
 *           description: Valid email address
 *          password:
 *           type: string
 *           description: 8 character password with at least one digit
 */

// Routes
/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Returns the list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get(
  "/get-all-users",
  [authenticateToken.verifyToken],
  userController.getAllUsers
);
router.get("/get-all-students", userController.getAllStudents);
router.get("/get-all-teachers", userController.getAllTeachers);
router.get("/get-user/:userId", userController.getUserById);

router.post(
  "/create-new-user",
  [userMiddleware.validateUser],
  userController.createUser
);
router.post("/assign-course", userController.assignCourse),
  /**
   * @swagger
   * /api/users/{userId}:
   *  patch:
   *    summary: Update user by userId
   *    tags: [Users]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: userId
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Admin'
   *    responses:
   *      200:
   *        description: User updated successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Admin'
   *      404:
   *        description: User not found
   *      500:
   *        description: Internal server error
   */
  router.put(
    "/update-user/:userId",
    [userMiddleware.validateUpdationData],
    userController.updateUser
  );
/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Delete user by userId
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique id assigned to each user
 *
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       404:
 *         description: User not found
 */
router.delete("/delete-user/:userId", userController.deleteUser);
router.post("/login", userController.login);

module.exports = router;
