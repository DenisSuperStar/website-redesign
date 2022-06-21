import mongoose from "mongoose";

const ServiceSchema = mongoose.Schema({
  userId: {
    type: Number,
  },
  id: {
    type: Number,
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

export const Services = mongoose.model("Services", ServiceSchema);
