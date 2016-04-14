var mongoose = require("mongoose");
var Event = require('./event');
var Schema = mongoose.Schema;

//TODO reconsider schema depending on external API fight-matrix or ufc.data.api
var fighterSchema = new Schema({
  wins: {
    type: Number,
    required: true
  },
  losses: {
    type: Number,
    required: true
  },
  draws: Number,
  last_name: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
    },
  weight_class: [String],
  rookieYear: String,
  nextFight: String
});

module.exports = mongoose.model('Fighter', fighterSchema);
