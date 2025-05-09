const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
