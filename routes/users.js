const mongoose =require("mongoose");

const pla= require("passport-local-mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/testingendgane2");

const userSchema= mongoose.Schema({

username: String, 
password: String,
secret: String
});
userSchema.plugin(pla);

module.exports = mongoose.model("user", userSchema);