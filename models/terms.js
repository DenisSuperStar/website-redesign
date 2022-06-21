import mongoose from "mongoose";

const TermSchema = mongoose.Schema({
  userId: {
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
  completed: {
    type: Boolean,
    required: true
  }
});

export const Terms = mongoose.model('Terms', TermSchema);