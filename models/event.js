var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Fighter = require('./fighter');

var eventSchema = new Schema({
  headliners:String,
  arena:String,
  date:String,
  city:String,
  fights:[String]
});

module.exports = mongoose.model('Event', eventSchema);
