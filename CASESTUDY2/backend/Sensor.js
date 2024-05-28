const mongoose = require('mongoose')

const SensorSchema = new mongoose.Schema({
    ph: Number,
    light: Number,
    time: Date
})

const SensorModel = mongoose.model ("sensors", SensorSchema)

module.exports = SensorModel;