const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema =  new mongoose.Schema({
  name : {type: String, required: true},
  email: {type: String, unique: true},
  password: {type: String , unique: true}
});

const User = mongoose.model('users', userSchema);

module.exports = User;