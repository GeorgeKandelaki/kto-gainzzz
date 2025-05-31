const express = require("express");
const authController = require("../controllers/authController.js");
const workoutController = require("../controllers/workoutController.js");
const exerciseRouter = require("./exerciseRoutes.js");

const router = express.Router();

// Workout Routes
router.use(authController.protect);
router.route("/").get(workoutController.getAll).post(workoutController.setUser, workoutController.createOne);
router
	.route("/:id")
	.get(workoutController.getOne)
	.patch(workoutController.updateOne)
	.delete(workoutController.deleteOne);

// Nested Exercise Routes
router.use("/:workoutId/exercise", exerciseRouter);

module.exports = router;
