import fetch from "node-fetch";
import { ServiceType } from "../models/serviceType";

export class loadTypesController {
  constructor() {}

  async loadTypes(req, res, next) {
    const target = await ServiceType.find({});
    const currentLen = target.length;

    if (currentLen) {
      await ServiceType.deleteMany({});
    }

    if (!currentLen) {
      const url = "https://jsonplaceholder.typicode.com/photos?_limit=30";
      const data = await fetch(url);
      const serviceType = await data.json();

      ServiceType.insertMany(serviceType);

      const types = await ServiceType.find({});

      res.render("types", {
        title: "Предметная область",
        types: types,
      });
    }
  }
}
