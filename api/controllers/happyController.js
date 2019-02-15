'use strict';

var mongoose = require('mongoose'),
  Mood = mongoose.model('Mood');

exports.list_all_moods = function(req, res) {
    console.log('hit list_all_moods');
    Mood.find({}, function(err, mood) {
    if (err)
      res.send(err);
    res.json(mood);
  });
};

exports.create_a_mood = function(req, res) {
  var new_mood = new Mood(req.body);
  new_mood.save(function(err, mood) {
    if (err){
      res.status(400);
      res.send(err);
    }
    res.json(mood);
  });
};

exports.read_a_mood = function(req, res) {
  Mood.findById(req.params.moodId, function(err, mood) {
    if (mood === undefined){
      res.status(404);
    }
    if (err){
      res.send(err);
    }
    res.json(mood);
  });
};

exports.update_a_mood = function(req, res) {
  console.log('hit update_a_mood');
  Mood.findOneAndUpdate({_id: req.params.moodId}, req.body, {new: true}, function(err, mood) {
    if (err){
      res.send(err);
    }
    res.json(mood);
  });
};

exports.delete_a_mood = function(req, res) {
  Mood.deleteOne({
    _id: req.params.moodId
  }, function(err, mood) {
    if (err){
      res.send(err);
    }    
    if (mood.deletedCount === 0){
      res.json({message: "No mood found matching that ID."});
    }
    else{
      res.json({ message: 'Mood successfully deleted' });
    }
  });
};