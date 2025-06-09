const User = require("../models/UserModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { filterObj } = require("../utils/utils");

exports.getMe = catchAsync(async function (req, res, next) {
	const user = await User.findById(req.user.id).select("name avatar");

	if (!user) return next(new AppError("No user found!", 404));

	return res.status(200).json({
		status: "Success",
		data: {
			user,
		},
	});
});

exports.updateMe = catchAsync(async function (req, res, next) {
	const user = await User.findByIdAndUpdate(req.user.id, filterObj(req.body, ["name", "avatar"]), {
		runValidators: true,
		new: true,
	});

	if (!user) return next(new AppError("User wasn't found!", 404));

	return res.status(200).json({
		status: "Success",
		data: {
			user,
		},
	});
});

exports.deleteMe = catchAsync(async function (req, res, next) {
	const user = await User.findByIdAndDelete(req.user.id);

	if (!user) return next(new AppError("User wasn't found!", 404));

	return res.status(204).json({
		status: "Success",
		data: null,
	});
});

exports.updatePassword = catchAsync(async function (req, res, next) {
	const filteredBody = filterObj(req.body, ["currentPassword", "password", "passwordConfirm"]);
	const user = await User.findById(req.user.id).select("+password");

	if (!user) return next(new AppError("No User found!", 404));
	if (!(await user.comparePasswords(filteredBody.currentPassword, user.password)))
		return next(new AppError("Current Password isn't correct!", 400));

	user.password = filteredBody.password;
	user.passwordConfirm = filteredBody.passwordConfirm;
	await user.save();

	return res.status(200).json({
		status: "Success",
		data: {
			user,
		},
	});
});
