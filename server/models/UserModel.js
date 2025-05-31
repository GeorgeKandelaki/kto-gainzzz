const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "User must have a name"],
		unique: [true, "This Name is already in use"],
		trim: true,
		min: [4, "Name can't be less than 4 characters!"],
		max: [30, "Name can't be more than 4 characters!"],
	},
	avatar: {
		type: String,
		default: "default_pfp.png",
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
	// workouts: [{ type: mongoose.Schema.ObjectId, ref: "Exercise" }],
	role: { type: String, default: "user", enum: { values: ["user", "admin"], message: `{VALUE} is not supported` } },
	createdAt: { type: Date, default: new Date() },
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

// Hash the Password
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);

	this.passwordConfirm = undefined;

	return next();
});

// Create a method on every User document to check if the password is right
userSchema.methods.comparePassword = async function (candidatePassword, userPassword) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
