import mongoose from "mongoose";

const ServiceTypeSchema = mongoose.Schema({
  albumId: {
    type: Number,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: true
  }
});

export const ServiceType = mongoose.model("ServiceType", ServiceTypeSchema);
