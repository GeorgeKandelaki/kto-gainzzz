const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const { promisify } = require("util");

function signToken(data) {
	return jwt.sign(data, process.env.JWT_SECRET, {});
}

function createSendToken(user, statusCode, req, res) {
	// 1) Sign Token
	const token = signToken(user.id);

	// 2) Options for Cookies
	const cookieOptions = {
		httpOnly: true,
		sameSite: "lax", // or "none" if you're doing fully cross-site and using HTTPS
	};

	if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

	// 3) Add token in Cookies Object
	res.cookie("jwt", token, cookieOptions);

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

exports.signup = catchAsync(async function (req, res, next) {
	const { name, avatar, password, passwordConfirm } = req.body;

	const user = await User.create({
		name,
		avatar,
		password,
		passwordConfirm,
		role: "user",
	}).select("name password");

	return createSendToken(user, 201, req, res);
});

exports.login = catchAsync(async function (req, res, next) {
	// 1) Get name and password from req.body
	const { name, password } = req.body;

	// 2) Check if name and password exists
	if (!name || !password) return next(new AppError("Email or Password is Incorrect!", 400));

	// 3) Fetch, Find the user by name and select password
	const user = await User.findOne({ name }).select("+password");

	// 4) Check if user exists, and if the passwords match
	if (!user || !(await user.comparePassword(password, user.password)))
		return next(new AppError("Email or Password is Incorrect!", 401));

	// 5) Send Token
	return createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async function (req, res, next) {
	let token;

	// 1) Check if we have token in cookies or headers
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
		token = req.headers.authorization.split(" ")[1];
	else if (req.cookies.jwt) token = req.cookies.jwt;

	if (!token) return next(new AppError("You are not logged in, Please log in to access!", 401));

	// 2) Decode the JWT token
	const decodedId = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// 3) Check if the token is valid
	const currentUser = await User.findById(decodedId);

	if (!currentUser) return next(new AppError("The User belonging to this token does no longer exist", 401));

	// 4) Grant access to protected routes
	req["user"] = currentUser;
	res.locals.user = currentUser;

	return next();
});

exports.restrictTo = function (roles) {
	return function (req, res, next) {
		if (!roles.includes(req.user.role))
			return next(new AppError("This user doesn't have permissions to access this source!", 401));

		return next();
	};
};

exports.logout = catchAsync(async function (req, res, next) {
	res.clearCookie("jwt");

	res.redirect("/");
	return res.status(200).json({
		status: "Success",
	});
});
