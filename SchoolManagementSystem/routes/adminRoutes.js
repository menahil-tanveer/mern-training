/**
 *
 * Author: Menahil
 * Created: 02-02-2022
 * Purpose: This file contains all the routes for admin
 *
 */
const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middlewares/adminMiddleware");
const adminController = require("../controllers/adminController");
const authenticateToken = require("../middlewares/authenticateToken");

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - adminId
 *         - fullName
 *         - email
 *         - password
 *       properties:
 *          id:
 *           type: string
 *           description: Self assigned unique id for admin
 *          fullName:
 *           type: string
 *           description: Full name of admin
 *          email:
 *           type: string
 *           description: Valid email address
 *          password:
 *           type: string
 *           description: 8 character password with at least one digit
 *       example:
 *         adminId: ADMIN-MIKE-001
 *         fullName:  Mike Kelly
 *         email: mike.kelly@gmail.com
 *         password: 1234567ABC
 */

// Routes
/**
 * @swagger
 * /api/admin/:
 *   get:
 *     summary: Returns the list of all admins
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: The list of the admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 */

router.get("/", [authenticateToken.verifyToken], adminController.getAllAdmins);
/**
 * @swagger
 * /api/admin/{adminId}:
 *   get:
 *     summary: Get admin by adminId
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: adminId
 *         schema:
 *           type: string
 *         required: true
 *         description: unique id for admin
 *     responses:
 *       200:
 *         description: Fetches admin object
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Admin not found
 */
router.get(
  "/get-admin/:adminId",
  [authenticateToken.verifyToken],
  adminController.getAdminById
);
/**
 * @swagger
 * /api/admins/create-new-admin:
 *   post:
 *     summary: Creates a new admin
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Admin successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Internal server error
 */
router.post(
  "/create-new-admin",
  [adminMiddleware.validateAdmin],
  adminController.createAdmin
);
/**
 * @swagger
 * /update-admin-info/{adminId):
 *  put:
 *    summary: Update admin by id
 *    tags: [Admins]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description:  Admin id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Admin'
 *    responses:
 *      200:
 *        description: The admin was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *      404:
 *        description: Admin not found
 *      500:
 *        description: Internal Server Error
 */
router.put(
  "/update-admin-info/:adminId",
  [authenticateToken.verifyToken, adminMiddleware.validateUpdationData],
  adminController.updateAdmin
);
/**
 * @swagger
 * /api/admin/{adminId}:
 *   delete:
 *     summary: Remove admin by adminId
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: adminId
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin id
 *
 *     responses:
 *       200:
 *         description: Admin successfully deleted
 *       404:
 *         description: Admin not found
 */
router.delete(
  "/delete-admin/:adminId",
  [authenticateToken.verifyToken],
  adminController.deleteAdmin
);

module.exports = router;
