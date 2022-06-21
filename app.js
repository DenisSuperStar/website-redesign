import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import http from "http";
import normalizePort from "./config/normalizePort";
import onError from "./config/onError";
import onListening from "./config/onListening";
import { settings } from "./config";
import { __dirname } from "./config/dirname";

import { indexRouter } from "./routes/index";
import { usersRouter } from "./routes/users";

const { login, password, defaultPort } = settings;
const port = normalizePort(process.env.PORT || defaultPort);
const url = `mongodb+srv://${login}:${password}@atlascluster.vylez.mongodb.net/test`;
const app = express();
const server = http.createServer(app);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.set("port", port);

mongoose
  .connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port, () => {
      console.log(`Сервер запущен на порту ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.stack);
  });

server.on("error", onError);
server.on("listening", onListening);


