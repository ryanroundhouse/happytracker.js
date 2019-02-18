'use strict';

var mongoose = require('mongoose');
var Mood = mongoose.model('Mood');
var Winston = require('../../config/winston') //import logging config

exports.ReadAllMoods = function(req, res) {
    Winston.debug('started ReadAllMoods');
    Mood.find({}, function(err, mood) {
    if (err){
      Winston.debug('error encountered while attempting to ReadAllMoods: ' + err);
      res.send(err);
    }
    res.json(mood);
  });
  Winston.debug('completed ReadAllMoods');
};

exports.CreateMood = function(req, res) {
  Winston.debug('started CreateMood');
  var new_mood = new Mood(req.body);
  new_mood.save(function(err, mood) {
    if (err){
      Winston.debug('error encountered while attempting to CreateMood: ' + err);
      res.status(400);
      res.send(err);
    }
    res.json(mood);
  });
  Winston.debug('completed CreateMood');
};

exports.ReadMood = function(req, res) {
  Winston.debug('started ReadMood');
  Mood.findById(req.params.moodId, function(err, mood) {
    if (mood === undefined){
      res.status(404);
    }
    if (err){
      Winston.debug('error encountered while attempting to ReadMood: ' + err);
      res.send(err);
    }
    res.json(mood);
  });
  Winston.debug('completed ReadMood');
};

exports.UpdateMood = function(req, res) {
  Winston.debug('started UpdateMood');
  Mood.findOneAndUpdate({_id: req.params.moodId}, req.body, {new: true}, function(err, mood) {
    if (err){
      Winston.debug('error encountered while attempting to UpdateMood: ' + err);
      res.send(err);
    }
    res.json(mood);
  });
  Winston.debug('completed CreateMood');
};

exports.DeleteMood = function(req, res) {
  Winston.debug('started DeleteMood');
  Mood.deleteOne({
    _id: req.params.moodId
  }, function(err, mood) {
    if (err){
      Winston.debug('error encountered while attempting to DeleteMood: ' + err);
      res.send(err);
    }    
    if (mood.deletedCount === 0){
      res.json({message: "No mood found matching that ID."});
    }
    else{
      res.json({ message: 'Mood successfully deleted' });
    }
  });
  Winston.debug('completed CreateMood');
};