import fetch from "node-fetch";
import { Slides } from "../models/slides";

const filter = {};

export class loadIndexController {
  constructor() {}

  async loadIndex(request, response, next) {
    const url = "https://jsonplaceholder.typicode.com/comments?_limit=30";
    const data = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const slides = await data.json();

    await Slides.insertMany(slides);

    const pages = await Slides.find(filter).exec();

    response.render("index", {
      title: "О компании",
      pages: pages,
    });
  }
}
