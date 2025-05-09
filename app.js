const path = require("path");
const cookieParser = require("cookie-parser");
const express = require("express");

const exerciseRouter = require("./routes/exerciseRoutes");
const workoutRouter = require("./routes/workoutRoutes");
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");

const app = express();

app.set("view engine", "pug");
app.set("");

// Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

// Parse Cookies
app.use(cookieParser());

// Use Body Parser to Read Data from the Request Body to req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Routes
app.use("/", viewRouter);
app.use("/api/v1/exercise", exerciseRouter);
app.use("/api/v1/workout", workoutRouter);
app.use("/ap1/v1/user", userRouter);

module.exports = app;
