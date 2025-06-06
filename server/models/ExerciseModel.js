const mongoose = require("mongoose");

const Workout = require("./WorkoutModel");

const exerciseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Exercise must have a name"],
		trim: true,
		min: [5, "Exercise name must be more than 5 characters"],
		max: [100, "Exercise name must be less than 150 characters"],
	},
	reps: { type: Number, min: 1, max: 50, required: [true, "Exercise must have reps specified! "] },
	sets: { type: Number, min: 1, max: 20, required: [true, "Exercise must have sets specified! "] },
	weight: { type: Number, min: 1, max: 5000, required: [true, "Exercise must have weight specified! "] },
	workout: { ref: "Workout", type: mongoose.Schema.ObjectId, required: [true, "Exercise must belong to workout!"] },
	metric: { type: String, default: "KG", enum: { values: ["KG", "LBS"], message: `{VALUE} is not supported` } },
	completed: { type: Boolean, default: false },
	createdAt: { type: Date, default: new Date() },
});

exerciseSchema.index({ name: 1 });

exerciseSchema.post("save", async function (doc) {
	const workout = await Workout.findById(doc.workout);
	if (workout.exercises.includes(doc.id)) return;

	workout.exercises.unshift(doc._id);
	await workout.save();
});

exerciseSchema.post("findOneAndDelete", async function (doc) {
	if (doc) {
		await Workout.findByIdAndUpdate(doc.workout, { $pull: { exercises: doc._id } });
	}
});

exerciseSchema.post("findByIdAndDelete", async function (doc) {
	if (doc) {
		await Workout.findByIdAndUpdate(doc.workout, { $pull: { exercises: doc._id } });
	}
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
