const User = require("../models/UserModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");

const { filterObj } = require("../utils/utils");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   }
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(new AppError("Not an image! Please upload only images.", 400), false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("image");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
	if (!req.file) return next();

	req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

	await sharp(req.file.buffer)
		.resize(200, 200, { fit: "fill" })
		.toFormat("jpeg")
		.jpeg({ quality: 90 })
		.toFile(`public/images/users/${req.file.filename}`);

	await User.findByIdAndUpdate(req.user.id, { avatar: `http://95.104.13.159:5000/images/users/${req.file.filename}` });

	next();
});

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
