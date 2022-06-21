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
import { loadContactsController } from "./controllers/loadContactsController";
import { loadTermsController } from "./controllers/loadTermsController";
import { loadServicesController } from "./controllers/loadServicesController";
import { loadTypesController } from "./controllers/loadTypesController";
import { loadIndexController } from "./controllers/loadIndexController";

const { request, response, next } = express;
const { login, password, defaultPort } = settings;
const port = normalizePort(process.env.PORT || defaultPort);
const url = `mongodb+srv://${login}:${password}@atlascluster.vylez.mongodb.net/test`;
const app = express();
const server = http.createServer(app);

const contactsController = new loadContactsController();
const termsCotroller = new loadTermsController();
const serviceController = new loadServicesController();
const typeController = new loadTypesController();
const indexController = new loadIndexController();

const { loadContacts } = contactsController;
const { loadTerms } = termsCotroller;
const { loadService } = serviceController;
const { loadTypes } = typeController;
const { loadIndex } = indexController;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", loadIndex(request, response, next)); // передать как function(request, response, next) {} 
app.get("/types", loadTypes(request, response, next));
app.get("/services", loadService(request, response, next));
app.get("/terms", loadTerms(request, response, next));
app.get("/contacts", loadContacts(request, response, next));

// catch 404 and forward to error handler
app.use(function (request, response, next) {
  next(createError(404));
});

// error handler
app.use(function (err, request, response, next) {
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
