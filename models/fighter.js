var mongoose = require("mongoose");
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
  last_name: {
    type: String,
    required: true
  },
  first_name: {
    type: Number,
    required: true
    },
  weight_class: [String],
  rookieYear: String
});

var Fighter = mongoose.model('Fighter', fighterSchema);
module.exports = Fighter;
