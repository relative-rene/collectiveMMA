var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = ({
    last_name: String,
    first_name: String,
    //TODO reconsider rookieYear possible years active Date.now since rookieYear
    rookieYear: String,
    ranking: Number,
    fightsScored: Number,
    predictionRate:String,
    highlights: String,// major bouts
    hometown: String,// possibly current City
  });

  var User = mongoose.model('User', userSchema);
  module.export = User;
