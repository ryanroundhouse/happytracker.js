'use strict';
module.exports = function(app) {
  var moodList = require('../controllers/happyController');

  // todoList Routes
  app.route('/moods')
    .get(moodList.list_all_moods)
    .post(moodList.create_a_mood);


  app.route('/moods/:moodId')
    .get(moodList.read_a_mood)
    .put(moodList.update_a_mood)
    .delete(moodList.delete_a_mood);
};