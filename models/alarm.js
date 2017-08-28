var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlarmSchema = new Schema({
  time: {
    type: String,
    trim: true
  },
  charity: {
    type: String,
    trim: true
  },
  label: {
    type: String,
    trim:true
  },
  repeat: [{
    type: String,
    trim: true
  }]
});

var Alarm = mongoose.model("Alarm", AlarmSchema);

module.exports = Alarm;