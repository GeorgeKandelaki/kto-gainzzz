const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAll = function (Model, sortObject) {
	return catchAsync(async function (req, res, next) {
		let query = Model.find();
		if (sortObject) query.sort(sortObject);
		const docs = await query;

		return res.status(200).json({
			status: "Success",
			results: docs.length,
			data: { data: docs },
		});
	});
};

exports.getOne = function (Model, populateOptions) {
	return catchAsync(async function (req, res, next) {
		let query = Model.findById(req.params.id);
		if (populateOptions) query.populate(populateOptions);
		const doc = await query;

		if (!doc) return next(new AppError("No document found with that id", 404));

		return res.status(200).json({
			status: "Success",
			data: {
				data: doc,
			},
		});
	});
};

exports.createOne = function (Model) {
	return catchAsync(async function (req, res, next) {
		const doc = await Model.create(req.body);

		return res.status(201).json({
			status: "Success",
			data: {
				data: doc,
			},
		});
	});
};

exports.deleteOne = function (Model) {
	return catchAsync(async function (req, res, next) {
		const doc = await Model.findByIdAndDelete(req.params.id);

		if (!doc) return next(new AppError("No document with that id was found", 404));

		res.status(204).json({
			status: "Success",
			data: null,
		});
	});
};

exports.updateOne = function (Model) {
	return catchAsync(async function (req, res, next) {
		const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

		console.log(doc);

		if (!doc) return next(new AppError("No document with that id was found", 404));

		return res.status(200).json({
			status: "Success",
			data: {
				data: doc,
			},
		});
	});
};
