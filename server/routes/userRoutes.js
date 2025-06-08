const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

// Public routes — no token/authentication required
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// All routes defined *after* this require authentication
router.use(authController.protect);
router.get("/me", userController.getMe);
router.post("/updateMe", userController.updateMe);
router.post("/updatePassword", userController.updatePassword);
router.delete("/deleteMe", userController.deleteMe);
router.get("/logout", authController.logout);

module.exports = router;
