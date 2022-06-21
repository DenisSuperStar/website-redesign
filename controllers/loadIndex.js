import { __dirname } from "../config/dirname";
import fetch from "node-fetch";
import { Items } from "../models/items";
import { Slides } from "../models/slides";
import { ServiceType } from "../models/serviceType";
import { Services } from "../models/services";
import { Contacts } from "../models/contacts";
import { Terms } from "../models/terms";

export class loadIndex {
  constructor() {}

  async __init__() {
    await this.#menuLoad();
    await this.#sliderLoad();
    await this.#serviceTypeLoad();
    await this.#serviceLoad();
    await this.#cooperationTermsLoad();
    await this.#contactsLoad();
  }

  async #menuLoad() {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const data = await fetch(url);
    const members = await data.json();
    
    Items.insertMany(members);
  }

  async #sliderLoad() {
    const url = 'https://jsonplaceholder.typicode.com/comments';
    const data = await fetch(url);
    const slides = await data.json();
    
    Slides.insertMany(slides);
  }

  async #serviceTypeLoad() {
    const url = 'https://jsonplaceholder.typicode.com/photos';
    const data = await fetch(url);
    const serviceType = await data.json();
    
    ServiceType.insertMany(serviceType);
  }

  async #serviceLoad() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const data = await fetch(url);
    const services = await data.json();

    Services.insertMany(services);
  }

  async #cooperationTermsLoad() {
    const url = "https://jsonplaceholder.typicode.com/todos/2";
    const data = await fetch(url);
    const cooperationTerms = await data.json();

    Terms.insertMany(cooperationTerms);
  }

  async #contactsLoad() {
    const url = "https://jsonplaceholder.typicode.com/users/1";
    const data = await fetch(url);
    const contactCustomer = await data.json();

    Contacts.insertMany(contactCustomer);
  }
}
