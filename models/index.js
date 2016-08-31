var mongoose = require('mongoose');
var MONGOLAB_CYAN_URI = "mongodb://heroku_726br2gj:dtqogtbbgfk4vuk1shrkahj5al@ds019946.mlab.com:19946/heroku_726br2gj";
mongoose.connect( MONGOLAB_CYAN_URI ||
                  process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/thescoreapp");
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {

module.exports.Fighter = require('./fighter.js');
module.exports.Judge = require('./judge.js');
module.exports.Referee = require('./referee.js');
module.exports.User = require('./user.js');
module.exports.ScoreCard = require('./scoreCard.js');
module.exports.Event = require('./event.js');
});
