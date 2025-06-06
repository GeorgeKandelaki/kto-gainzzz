const path = require("path");
const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const qs = require("qs");

const exerciseRouter = require("./routes/exerciseRoutes");
const workoutRouter = require("./routes/workoutRoutes");
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// app.enable("trust proxy");

// Implement CORS
const allowedOrigins = ["http://localhost:3000", "http://95.104.13.159:3000"];
app.use(
	cors({
		origin: function (origin, callback) {
			try {
				if (!origin) return callback(null, true);
				if (allowedOrigins.includes(origin.toLowerCase())) {
					return callback(null, true);
				}
				callback(new Error("Not allowed by CORS"));
			} catch (err) {
				callback(err);
			}
		},
		credentials: true,
	})
);

// Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

// Parse Cookies
app.use(cookieParser());

// Parse Query String
app.set("query parser", (str) => qs.parse(str));

// Limit Requests from same API
const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: "Too many requests from this IP, please try again in an hour!",
});
// app.use("/api", limiter);

// Data sanitization against NoSQL query injection
// app.use(mongoSanitize()); <- Doesn't work for some reason

// Security Middlewares
app.use(helmet());
// app.use(xss()); <- Doesn't work for some reason
app.use(hpp());
app.use(compression());

// Use Body Parser to Read Data from the Request Body to req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Routes
app.use("/", viewRouter);
app.use("/api/v1/exercise", exerciseRouter);
app.use("/api/v1/workout", workoutRouter);
app.use("/api/v1/user", userRouter);

// app.all("*", (req, res, next) => {
// 	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(globalErrorHandler);

module.exports = app;
