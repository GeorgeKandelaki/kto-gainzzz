const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

// Public routes — no token/authentication required
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// All routes defined *after* this require authentication
router.use(authController.protect);
router.get("/me", userController.getMe);

module.exports = router;
