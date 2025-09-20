'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;

                                                                                                             
  var profileSchema = {
        userId : {
            type: String,
            trim: true,
            required: true
        },
        address : {
            type: String,
            trim: true,
            required: true
        },
        items : {
            type : [String],
            required : true
        },
        finalPrice : {
            type: String,
            required: true
        }
  }

  module.exports = mongoose.model('profile', profileSchema);