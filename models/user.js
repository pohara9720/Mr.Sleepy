var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  local: {
    username: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  alarms: [{
    type: Schema.Types.ObjectId,
    ref: "Alarm"
  }]
});

var User = mongoose.model("User", userSchema);

module.exports = User;