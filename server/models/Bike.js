const mongoose = require("mongoose")

const bike = new mongoose.Schema({
  name: {type: String, unique: true},
  type: {type: String},
  price: {type: Number},
  rent_hours: {type: Number, default: 1},
  isRent: {type: Boolean, default: false},
  DateCreate: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Bike", bike)