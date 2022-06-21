import fetch from "node-fetch";
import { Contacts } from "../models/contacts";

export class loadContactsController {
  constructor() {}

  async loadContacts(req, res, next) {
    const target = await Contacts.find({});
    const currentLen = target.length;

    if (currentLen) {
      await Contacts.deleteMany({});
    }

    if (!currentLen) {
      const url = "https://jsonplaceholder.typicode.com/users/1";
      const data = await fetch(url);
      const contactCustomer = await data.json();

      Contacts.insertMany(contactCustomer);

      const contacts = await Contacts.find({});

      res.render("contacts", {
        title: "Связаться с нами",
        constacts: contacts,
      });
    }
  }
}
