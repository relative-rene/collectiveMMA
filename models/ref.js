var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var refereeSchema = new Schema({
    last_name: String,
    first_name: String,
    //TODO reconsider rookieYear possible years active Date.now since rookieYear
    rookieYear: String,
    fightsRef: Number,
    titleFights: Number,
    highlights: String,// major bouts
    hometown: String,// possibly current City
});
