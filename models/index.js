var mongoose = require('mongoose');
var mongodUri = 'mongodb://heroku_w7pcd47r:c2stj3uatqdm1blh5g1dimeff0@ds019836.mlab.com:19836/heroku_w7pcd47r';
mongoose.connect(mongodbUri);
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
