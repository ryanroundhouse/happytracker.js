'use strict';
module.exports = function(app) {
  var moodList = require('../controllers/happyController');

  // todoList Routes
  app.route('/moods')
    .get(moodList.ReadAllMoods)
    .post(moodList.CreateMood);


  app.route('/moods/:moodId')
    .get(moodList.ReadMood)
    .put(moodList.UpdateMood)
    .delete(moodList.DeleteMood);
};