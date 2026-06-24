const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String },
  venue: { type: String },
  description: { type: String },
});

const weddingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    description: { type: String },
    events: [eventSchema],
    budget: {
      total: { type: Number, default: 0 },
      spent: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wedding', weddingSchema);