const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
