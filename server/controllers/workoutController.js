const Workout = require("../models/WorkoutModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.getAll = catchAsync(async function (req, res, next) {
	const query = { user: req.user.id };
	if (req.query.s) query.$text = { $search: req.query.s };
	// console.log("QUERY OBJ:", query, "\n", "QUERY STRING:", req.query);
	// console.log("COOKIES OBJ:", req.cookies, "\n", "HEADERS OBJ:", req.headers);

	let workouts = new APIFeatures(Workout.find(query), req.query).paginate();

	workouts = await workouts.query;

	return res.status(200).json({
		status: "Success",
		results: workouts.length,
		data: {
			workouts,
		},
	});
});

exports.getOne = catchAsync(async function (req, res, next) {
	const workout = await Workout.findById(req.params.id).populate({ path: "exercises" });

	if (!workout) return next(new AppError("Workout was't found", 404));
	if (workout.user.toString() !== req.user.id)
		return next(new AppError("This Workout doesn't belong to this user!", 401));

	return res.status(200).json({
		status: "Success",
		data: {
			workout,
		},
	});
});

exports.createOne = catchAsync(async function (req, res, next) {
	const workout = await Workout.create(req.body);

	return res.status(201).json({
		status: "Success",
		data: {
			workout,
		},
	});
});

exports.deleteOne = catchAsync(async function (req, res, next) {
	const workout = await Workout.findById(req.params.id);

	if (!workout) return next(new AppError("Workout was't found", 404));
	if (workout.user.toString() !== req.user.id)
		return next(new AppError("This Workout doesn't belong to this user!", 401));

	await workout.deleteOne();

	return res.status(204).json({
		status: "Success",
		data: null,
	});
});

exports.updateOne = catchAsync(async function (req, res, next) {
	let workout = await Workout.findById(req.params.id);

	if (!workout) return next(new AppError("Workout wasn't found", 404));
	if (workout.user.toString() !== req.user.id)
		return next(new AppError("This workout doesn't belong to this user!", 401));

	workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	return res.status(200).json({
		status: "Success",
		data: {
			workout,
		},
	});
});

exports.setUser = function (req, res, next) {
	req.body.user = req.user.id;
	return next();
};
