var mongoose = require("mongoose");
var db = require('../models');
mongoose.connect(process.env.MONGOLAB_CYAN_URI || 'mongodb://localhost/thescoreapp');

module.exports.Fighter = require('./fighter.js');
module.exports.Judge = require('./judge.js');
module.exports.Referee = require('./referee.js');
module.exports.User = require('./user.js');
module.exports.ScoreCard = require('./scoreCard.js');
module.exports.Event = require('./event.js');
