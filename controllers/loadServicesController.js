import fetch from "node-fetch";
import { Services } from "../models/services";

export class loadServicesController {
  constructor() {}

  async loadService(req, res, next) {
    const target = await Services.find({});
    const currentLen = target.length;

    if (currentLen) {
      await Services.deleteMany({});
    }

    if (!currentLen) {
      const url = "https://jsonplaceholder.typicode.com/posts?_limit=30";
      const data = await fetch(url);
      const services = await data.json();

      Services.insertMany(services);

      const ourServices = await Services.find({});

      res.render("services", {
        title: "Прайс лист компании",
        services: ourServices,
      });
    }
  }
}
