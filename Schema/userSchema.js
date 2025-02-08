const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    
    username: String,
    phonenumber: Number,
    password: String,
    role: String,
    fullname: String,
    Token:String,
    address:String
  },{
    timestamps:true
  }
);
  
  module.exports = mongoose.model('User', userSchema);