import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import http from "http";
import hbs from "hbs";
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

const { MONGO_LOGIN, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_DB, APP_PORT } =
  settings;
const port = normalizePort(process.env.PORT || APP_PORT);
const url = `mongodb+srv://${MONGO_LOGIN}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}`;
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

hbs.registerPartials(__dirname + '/views/partials');

app.get("/", loadIndex);
app.get("/types", loadTypes);
app.get("/services", loadService);
app.get("/terms", loadTerms);
app.get("/contacts", loadContacts);

// catch 404 and forward to error handler
app.use(function (request, response, next) {
  next(createError(404));
});

// error handler
app.use(function (err, request, response, next) {
  // set locals, only providing error in development
  response.locals.message = err.message;
  response.locals.error = request.app.get("env") === "development" ? err : {};

  // render the error page
  response.status(err.status || 500);
  response.render("error");
});

app.set("port", port);

(async () => {
  try {
    mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    server.listen(port, () => {
      console.log(`Сервер запущен на порту ${port}`);
    });

    server.on("error", onError);
    server.on("listening", onListening);

  } catch (err) {
    mongoose.disconnect();
    console.log(createError(err));
  }
})();
