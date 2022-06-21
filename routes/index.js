import express from "express";
import createError from "http-errors";
import { loadIndex } from "../controllers/loadIndex";
import { Index } from "../models";

const index = new loadIndex();
index.__init__();

export const indexRouter = express.Router();

/* GET home page. */
indexRouter.get("/", function (req, res, next) {
  Index.find({}, function (err, val) {
    if (err) next(createError(500));

    console.log(val);
    res.render("index", { title: "Express" });
  });
});
