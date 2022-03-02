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
 *           description: unique id for admin
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

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin managing API
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
router.get(
  "/get-admin/:adminId",
  [authenticateToken.verifyToken],
  adminController.getAdminById
);

router.post(
  "/create-new-admin",
  [adminMiddleware.validateAdmin, authenticateToken.verifyToken],
  adminController.createAdmin
);
router.put(
  "/update-admin-info/:adminId",
  [adminMiddleware.validateUpdationData, authenticateToken.verifyToken],
  adminController.updateAdmin
);

router.delete(
  "/delete-admin/:adminId",
  [authenticateToken.verifyToken],
  adminController.deleteAdmin
);

module.exports = router;
