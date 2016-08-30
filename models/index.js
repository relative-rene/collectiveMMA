var mongoose = require('mongoose');
var MONGOLAB_GRAY_URI = 'mongodb://heroku_shtht34x:hip69ejvg0u13j5h0a7gvtec0h@ds019936.mlab.com:19936/heroku_shtht34x';
mongoose.connect(MONGOLAB_GRAY_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){
module.exports.Fighter = require('./fighter.js');
module.exports.Judge = require('./judge.js');
module.exports.Referee = require('./referee.js');
module.exports.User = require('./user.js');
module.exports.ScoreCard = require('./scoreCard.js');
module.exports.Event = require('./event.js');
});
