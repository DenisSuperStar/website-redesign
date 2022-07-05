import express from "express";
import fetch from "node-fetch";
import { Terms } from "../models/terms";

const { request, response, next } = express;
//const filter = {};

export class loadTermsController {
  constructor() {}

  async loadTerms(request, response, next) {
    await Terms.deleteMany({});

    const url = "https://jsonplaceholder.typicode.com/todos/2";
    const data = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const cooperationTerms = await data.json();

    await Terms.insertMany(cooperationTerms);

    //const terms = await Terms.find(filter).exec();

    response.render("terms", {
      title: "Условия сотрудничества",
      terms: cooperationTerms,
    });
  }
}
