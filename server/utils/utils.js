exports.createPropertyInBody = function (property1, property2) {
	return (req, res, next) => {
		if (!req.body[property1]) req.body[property1] = req.params[property2];

		return next();
	};
};

exports.createPropertiesInBody = function (mappings) {
	return (req, res, next) => {
		for (const [bodyKey, paramKey] of Object.entries(mappings)) {
			if (!req.body[bodyKey]) req.body[bodyKey] = req.params[paramKey];
		}
		return next();
	};
};

exports.assertCurrentUserOwns = function (doc, req, next) {
	if (!doc || doc.user.toString() !== req.user.id) {
		return next(new AppError("This data doesn't belong to this user!", 401));
	}
};

exports.addToParentArray = async function (parentModel, parentId, arrayField, valueToAdd) {
	const parent = await parentModel.findById(parentId);

	if (!parent[arrayField].includes(valueToAdd)) {
		parent[arrayField].push(valueToAdd);
		await parent.save();
	}
};

exports.filterObj = function (bodyObj, allowedFields) {
	const newObj = {};

	for (const [key, value] of Object.entries(bodyObj)) {
		if (allowedFields.includes(key)) newObj[key] = value;
	}

	return newObj;
};
