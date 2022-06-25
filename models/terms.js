import mongoose from "mongoose";

const { Schema } = mongoose;
export const Terms = mongoose.model(
  "Terms",
  Schema({
    userId: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  })
);
