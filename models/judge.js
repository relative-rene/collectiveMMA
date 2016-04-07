var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var JudgeSchema = new Schema({
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
  fightsJudge: Number,
  titleFights: Number,
  highlights: String,// major bouts
  hometown: String,// possibly current City
});
var Judge = mongoose.model('Judge', JudgeSchema);
module.exports = Judge;
