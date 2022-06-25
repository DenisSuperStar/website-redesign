import mongoose from "mongoose";

const { Schema } = mongoose;
export const Slides = mongoose.model(
  "Slides",
  Schema({
    postId: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  })
);
