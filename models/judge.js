var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var JudgeSchema = new Schema({
  last_name: String,
  first_name: String,
  //TODO reconsider rookieYear possible years active Date.now since rookieYear
  rookieYear: String,
  fightsJudge: Number,
  titleFights: Number,
  highlights: String,// major bouts
  hometown: String,// possibly current City
});
var Judge = mongoose.model('Judge', JudgeSchema);
module.exports = Judge;
