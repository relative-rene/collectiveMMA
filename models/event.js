var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  place:String,
  date:String,
  fights:[String]
});

module.exports = mongoose.model('Event', eventSchema);
