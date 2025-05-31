const express = require("express");
const authController = require("../controllers/authController");
const exerciseController = require("../controllers/exerciseController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.post("/", exerciseController.createOne);

router
	.route("/:exerciseId")
	.all(exerciseController.setExercise)
	.delete(exerciseController.deleteOne)
	.patch(exerciseController.updateOne);

module.exports = router;
