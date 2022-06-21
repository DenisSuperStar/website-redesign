import mongoose from "mongoose";

const ItemSchema = mongoose.Schema({
  userId: {
    type: Number,
  },
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
});

export const Items = mongoose.model("Items", ItemSchema);
