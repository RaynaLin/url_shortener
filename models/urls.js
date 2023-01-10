const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  origin: {
    type: String,
    require: true
  },

  short: {
    type: String
  }
})

module.exports = mongoose.model('Url', urlSchema)