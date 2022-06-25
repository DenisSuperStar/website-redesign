import express from "express";
import fetch from "node-fetch";
import { ServiceType } from "../models/serviceType";

const { request, response, next } = express;
//const filter = {};

export class loadTypesController {
  constructor() {}

  async loadTypes(request, response, next) {
    const url = "https://jsonplaceholder.typicode.com/photos?_limit=30";
    const data = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const serviceType = await data.json();

    await ServiceType.insertMany(serviceType);

    //const types = await ServiceType.find(filter).exec();

    response.render("types", {
      title: "Предметная область",
      types: serviceType,
    });
  }
}
