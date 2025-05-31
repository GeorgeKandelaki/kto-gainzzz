const Exercise = require("../models/ExerciseModel");
const Workout = require("../models/WorkoutModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const handlerFactory = require("./handlerFactory");

exports.createOne = catchAsync(async function (req, res, next) {
	const workout = await Workout.findById(req.params.workoutId);

	if (!workout) return next(new AppError("This Workout doesn't exist", 404));
	if (workout.user.toString() !== req.user.id)
		return next(new AppError("This workout doesn't belong to this user!", 401));

	req.body.workout = req.params.workoutId;
	const exercise = await Exercise.create(req.body);

	return res.status(201).json({
		status: "Success",
		data: {
			exercise,
		},
	});
});

exports.deleteOne = handlerFactory.deleteOne(Exercise);
exports.updateOne = handlerFactory.updateOne(Exercise);

exports.setExercise = catchAsync(async function (req, res, next) {
	const exercise = await Exercise.findById(req.params.exerciseId);

	if (!exercise) return next(new AppError("Exercise not found", 404));

	const workout = await Workout.findById(exercise.workout);

	if (!workout || workout.user.toString() !== req.user.id)
		return next(new AppError("This exercise doesn't belong to this user!", 401));

	req.params.id = req.params.exerciseId;
	return next();
});
