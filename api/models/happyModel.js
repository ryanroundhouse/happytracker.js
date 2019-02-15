'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MoodSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Enter your name.']
  },
  date: {
    type: Date,
    required: [true, 'Enter date of mood.']
  },
  mood: {
    type: String,
    enum: ['bad', 'ok', 'good'],
    required: [true, 'Specify your mood.']
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Mood', MoodSchema);