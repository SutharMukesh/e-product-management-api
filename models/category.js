/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const category = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  parent_id: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('category', category);
