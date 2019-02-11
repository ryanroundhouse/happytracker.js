'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MoodSchema = new Schema({
  name: {
    type: String,
    required: 'Enter your name.'
  },
  date: {
    type: Date,
    default: Date.now,
    required: 'Enter date of mood.'
  },
  mood: {
    type: [{
      type: String,
      enum: ['bad', 'ok', 'good']
    }],
    default: ['ok'],
    required: 'Specify your mood.'
  }
});

module.exports = mongoose.model('Mood', MoodSchema);