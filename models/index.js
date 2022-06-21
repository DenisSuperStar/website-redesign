import mongoose from "mongoose";

const { Schema } = mongoose;
const IndexSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  items: {
    type: Schema.Types.Array,
    ref: "Items",
  },
  pages: {
    type: Schema.Types.Array,
    ref: "Slides",
  },
  types: {
    type: Schema.Types.Array,
    ref: "ServiceType",
  },
  services: {
    type: Schema.Types.Array,
    ref: "Services",
  },
  terms: {
    type: Schema.Types.Array,
    ref: "Terms",
  },
});

export const Index = mongoose.model("Index", IndexSchema);
