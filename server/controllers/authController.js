const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");

const { promisify } = require("util");

function signToken(data) {
	return jwt.sign(data, process.env.JWT_SECRET);
}

function createSendToken(user, statusCode, req, res) {
	// 1) Sign Token
	const token = signToken(user.id);

	// 2) Options for Cookies
	const cookieOptions = { httpOnly: true };

	if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

	// 3) Add token in Cookies
	req.cookie("jwt", token, cookieOptions);

	// 4) Remove Password from User
	user.password = undefined;

	// 5) Send the token
	return res.status(statusCode).json({
		status: "Success",
		token,
		data: {
			user,
		},
	});
}

exports.signup = catchAsync(function (req, res, next) {});

exports.login = catchAsync(function (req, res, next) {});

exports.protect = catchAsync(function (req, res, next) {});
