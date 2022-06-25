import express from "express";
import fetch from "node-fetch";
import { Services } from "../models/services";

const { request, response, next } = express;
//const filter = {};

export class loadServicesController {
  constructor() {}

  async loadService(request, response, next) {
    const url = "https://jsonplaceholder.typicode.com/posts?_limit=30";
    const data = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const services = await data.json();

    await Services.insertMany(services);

    //const ourServices = await appdb.services.find(filter).exec();

    response.render("services", {
      title: "Прайс лист компании",
      services: services,
    });
  }
}
