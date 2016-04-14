var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var refereeSchema = new Schema({
    last_name: {
      type: String,
      required: true
    },
    first_name: {
    type: Number,
    required: true
    },
    //TODO reconsider rookieYear possible years active Date.now since rookieYear
    rookieYear: String,
    fightsRef: Number,
    titleFights: Number,
    highlights: String,// major bouts
    hometown: String,// possibly current City
});

var Referee = mongoose.model("Referee", refereeSchema);
module.export = Referee;
