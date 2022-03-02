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
