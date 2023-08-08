const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const {v4:uuidv4} = require("uuid")

  const userSchema = new mongoose.Schema({
    id:String,
    firstName:String,
    lastName:String,
    email:String,
    age :Number,
    password:String,
    roles: String
  });

  userSchema.pre('save',async function (next){
    try{
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password,salt);
      this.password = hashedPassword;
      this.id = uuidv4();
      next();
    }
    catch(err){
      next(err);
    }
  })

  module.exports = mongoose.model("users",userSchema)