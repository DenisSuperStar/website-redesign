import fetch from "node-fetch";
import { Terms } from "../models/terms";

export class loadTermsController {
  constructor() {}

  async loadTerms(req, res, next) {
    const target = await Terms.find({});
    const currentLen = target.length;

    if (currentLen) {
      await Terms.deleteMany({});
    }

    if (!currentLen) {
      const url = "https://jsonplaceholder.typicode.com/todos/2";
      const data = await fetch(url);
      const cooperationTerms = await data.json();

      Terms.insertMany(cooperationTerms);

      const terms = await Terms.find({});

      res.render("terms", {
        title: "Усовия сотрудничества",
        terms: terms,
      });
    }
  }
}
