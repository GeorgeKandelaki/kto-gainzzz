const mongoose = require("mongoose");
const Exercise = require("./ExerciseModel");

const workoutSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Workout Day must have a name"],
		min: [5, "Workout name must be more than 5 characters"],
		max: [80, "Workout name must be less than 150 characters"],
	},
	description: {
		type: "String",
		default: "No description",
		max: [150, "Description must be less than 10000 characters"],
	},
	user: {
		ref: "User",
		type: mongoose.Schema.ObjectId,
		required: [true, "Workout must belong to user!"],
	},
	exercises: [{ type: mongoose.Schema.ObjectId, ref: "Exercise" }],
	createdAt: { type: Date, default: new Date() },
});

workoutSchema.index({ user: 1 });

workoutSchema.pre("findOne", function (next) {
	this.populate({ path: "exercises" });

	next();
});

workoutSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
	if (!this.exercises.length) return;

	await Exercise.deleteMany({ workout: this._id });

	next();
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
