const mongoose = require('mongoose');


module.exports.Connect = async () =>{
  try {
    await mongoose.connect(process.env.dastabase_host)
    console.log("connect success")
  } catch (error) {
    console.log("connect failed",error)
  }
}