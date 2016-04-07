var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//TODO reconsider schema depending on external API fight-matrix or ufc.data.api
var FighterSchema = new Schema({
  wins: Number,
  losses: Number,
  last_name: String,
  first_name: String,
  weight_class: String
});

var Fighter = mongoose.model('Fighter', FighterSchema);
module.exports = Fighter;
