import express, { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import mongoose from "mongoose";
import logger from "morgan";
import passport from "passport";
import path from "path";
import passportJwt from "./auth/jwt";
import { DB_URL } from "./config/env";
import apiRouter from "./routes/api/index";
import indexRouter from "./routes/index";

const app = express();

// connect to the database
const MONGO_URL = DB_URL;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => console.error(err));

passportJwt(passport);

// view engine setup
if (process.env.NODE_ENV === "development") {
  const cors = require("cors");
  app.use(cors());
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
