const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    birthdate: String,
    gender: String,
    address: String,
    preferredMatchAge: Number,
    distance: Number,
    MBTI: String,
    zodiac: String,
    sexuality: String
    
})

const UserModel = mongoose.model ("user", UserSchema)

module.exports = UserModel;