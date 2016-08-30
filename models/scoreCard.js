var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var scoreCardSchema = new Schema ({
  fighter1Score: {
    type: Number,
    required: true
  },
  fighter2Score: {
    type: Number,
    required: true
  },
  fighter1: {
    type: Schema.Types.ObjectId,
    ref: 'Fighter'
  },
  fighter2: {
    type: Schema.Types.ObjectId,
    ref: 'Fighter'
  }
});
var ScoreCard = mongoose.model('ScoreCard', scoreCardSchema);
module.exports = ScoreCard;
