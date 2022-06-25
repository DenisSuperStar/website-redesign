import mongoose from "mongoose";

const { Schema } = mongoose;
export const ServiceType = mongoose.model(
  "ServiceType",
  Schema({
    albumId: {
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
    url: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
  })
);
