const mongoose = require('mongoose')
// const uniqueValidator = require("mongoose-unique-validator")

const userSchema= mongoose.Schema({
  fname:{type:String, required:true},
  lname:{type:String, required:true},
  email:{type: String, required:true},
  phoneno:{type: String, required: true},
  imagePath:{type:String}
});

// userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
