import mongoose from "mongoose";

const { Schema } = mongoose;
export const Services = mongoose.model(
  "Services",
  Schema({
    userId: {
      type: Number,
    },
    id: {
      type: Number,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  })
);
