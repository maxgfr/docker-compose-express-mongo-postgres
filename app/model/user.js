var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
});
module.exports = mongoose.model('users', userSchema);