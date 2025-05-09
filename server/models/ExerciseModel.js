const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Exercise must have a name"],
		trim: true,
		min: [5, "Exercise name must be more than 5 characters"],
		max: [150, "Exercise name must be less than 150 characters"],
	},
	reps: { type: Number, min: 1, max: 50 },
	sets: { type: Number, min: 1, max: 12 },
	weight: { type: Number, min: 1, max: 5000 },
	metric: { type: String, enum: { value: ["KG", "LBS"], message: `{VALUE} is not supported` } },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
