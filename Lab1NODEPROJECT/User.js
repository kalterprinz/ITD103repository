const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    birthdate: String,
    gender: String,
    constellation: String,
    country: String,
    affiliation: String,
    vision: String,
    weapon: String,
    artifacts:String
    
})

const UserModel = mongoose.model ("user", UserSchema)

module.exports = UserModel;