const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  }
});

module.exports = mongoose.model('Note', noteSchema);