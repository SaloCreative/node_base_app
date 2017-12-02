'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema({
  first_name: {
    type: String,
    trim: true,
    required: [true, 'Your first name is required!']
  },
  last_name: {
    type: String,
    trim: true,
    required: [true, 'Your last name is required!']
  },
  role: {
    type: String,
    trim: true
  },
  date_of_birth: {
    type: String,
    trim: true
  },
  email_address: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'An email address is required!']
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  hash_password: {
    type: String,
    trim: true,
    required: [true, 'A password is required!']
  },
  phone: {
    type: String,
    trim: true
  },
  address_one: {
    type: String,
    trim: true
  },
  address_two: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  county: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  profile_image: {
    type: Object
  },
  created: {
    type: Date,
    default: Date.now
  },
  last_modified: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.hash_password;
  return obj
};


mongoose.model('User', UserSchema);
