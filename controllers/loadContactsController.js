import express from "express";
import fetch from "node-fetch";
import { Contacts } from "../models/contacts";

const { request, response, next } = express;
//const filter = {};

export class loadContactsController {
  constructor() {}

  async loadContacts(request, response, next) {
    await Contacts.deleteMany({});

    const url = "https://jsonplaceholder.typicode.com/users/1";
    const data = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const contactCustomer = await data.json();

    await Contacts.insertMany(contactCustomer);

    //const contacts = await Contacts.find(filter).exec();
    const { id, name, username, email, phone, website, address } =
      contactCustomer;
    const { street, suite, city, zipcode } = address;

    response.render("contacts", {
      title: "Связаться с нами",
      _id: id,
      name: name,
      username: username,
      mail: email,
      phone: phone,
      site: website,
      street: street,
      suite: suite,
      city: city,
      zipcode: zipcode
    });
  }
}
