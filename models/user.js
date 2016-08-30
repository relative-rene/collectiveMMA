var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = ({
    last_name: {
      type:String,
      required:true
    },
    //TODO reconsider rookieYear possible years active Date.now since rookieYear
    rookieYear: {
      type: String,
      required: true
    },
    ranking: {
      type:Number,
      required: true
    },
    fightsScored: Number,
    predictionRate:String,
    highlights: String,// major bouts
    hometown: String,// possibly current City
  });

  var User = mongoose.model('User', userSchema);
  module.exports = User;
