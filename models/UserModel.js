const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "User must have a name"],
		unique: [true, "This Name is already in use"],
		trim: true,
		min: [4, "Name can't be less than 4 characters!"],
		max: [30, "Name can't be more than 4 characters!"],
	},
	password: {
		type: String,
		trim: true,
		required: [true, "User must have a password"],
		min: [8, "Password can't be less than 8 characters!"],
		max: [30, "Password can't be more than 30 characters!"],
	},
	passwordConfirm: {
		type: String,
		trim: true,
		required: [true, "User must confirm his password"],
		validate: {
			validator: function (el) {
				return el === this.passwordConfirm;
			},
			message: "Passwords are not the same",
		},
	},
	workouts: [{ type: mongoose.Schema.ObjectId, ref: "Exercise" }],
	role: { type: String, enum: { values: ["user", "admin"], message: `{VALUE} is not supported` } },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
