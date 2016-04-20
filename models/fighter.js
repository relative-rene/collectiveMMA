var mongoose = require("mongoose");
var Event = require('./event');
var Schema = mongoose.Schema;

//TODO reconsider schema depending on external API fight-matrix or ufc.data.api
var fighterSchema = new Schema({
  familyName: {
    type: String,
    required: true
  },
  birthName: {
    type: String,
    required: true
    },
  division: String,
  rookieYear: String,
  nextFight: [Event.schema],
  moniker: String,
  win: String,
  loss: String,
  draw: String,
});

module.exports = mongoose.model('Fighter', fighterSchema);
