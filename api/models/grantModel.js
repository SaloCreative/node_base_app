'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Organisation Schema
 */
var GrantSchema = new Schema({
  slug: {
    type: String,
    trim: true,
    required: [true, 'A grant slug is required!']
  },
  user_id: {
    type: String,
    trim: true,
    required: [true, 'A user id is required!']
  },
  slug_id: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'A unique slug_id is required!']
  },
  created: {
    type: Date,
    default: Date.now
  }
});


mongoose.model('Grant', GrantSchema);
