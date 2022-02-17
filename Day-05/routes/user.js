const express = require("express");
const router = express.Router();
// const userMiddleware = require("..")
const userController = require("../controllers/user");
router.get("/", userController.getAllUsers);
router.post("/", userController.getAllUsers);

module.exports = router;
