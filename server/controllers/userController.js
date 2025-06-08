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

exports.updateMe = catchAsync(async function (req, res, next) {});

exports.updatePassword = catchAsync(async function (req, res, next) {});

exports.deleteMe = catchAsync(async function (req, res, next) {});
z;
