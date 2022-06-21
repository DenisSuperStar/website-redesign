import fetch from "node-fetch";
import { Slides } from "../models/slides";

export class loadIndexController {
  constructor() {}

  async loadIndex(req, res, next) {
    const target = await Slides.find({});
    const currentLen = target.length;

    if (currentLen) {
      await Slides.deleteMany({});
    }

    if (!currentLen) {
      const url = "https://jsonplaceholder.typicode.com/comments?_limit=30";
      const data = await fetch(url);
      const slides = await data.json();

      Slides.insertMany(slides);

      const pages = await Slides.find({});

      res.render("index", {
        title: "О компании",
        pages: pages,
      });
    }
  }
}
