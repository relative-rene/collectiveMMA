var mongoose = require("mongoose");
var Event = require('./event');
var Schema = mongoose.Schema;

//TODO reconsider schema depending on external API fight-matrix or ufc.data.api
var fighterSchema = new Schema({
  wins: {
    type: Number,
    required: false
  },
  losses: {
    type: Number,
    required: false
  },
  draws: Number,
  familyName: {
    type: String,
    required: true
  },
  birthName: {
    type: String,
    required: true
    },
  division: [String],
  rookieYear: String,
  nextFight: [Event.schema],
  moniker: String,
});

module.exports = mongoose.model('Fighter', fighterSchema);
