'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Notification Schema
 */
var NotificationSchema = new Schema({
  message: {
    type: String,
    trim: true,
    required: [true, 'A message is required!']
  },
  additional_data: {
    type: Object
  },
  type: {
    type: String,
    trim: true,
    default: 'general'
  },
  dismissed: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});


mongoose.model('Notification', NotificationSchema);
