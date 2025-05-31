const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const port = process.env.PORT || 5000;
const connectionString = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(connectionString).then(() => console.log("MongoDB Was Connected Successfully..."));

const server = app.listen(port, () => {
	console.log(`Server is Listening to requests on ${port}...`);
});
