const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const CustomerSchema = new Schema({
  name: {
    type: String, 
    required: true,
    max: [20, 'Max length is 20 character']
  },
  address: {
    type: String,
    required: true
  },
  card: {
    type: String,
    min: [9, 'Min length is 9 digits'],
    max: [9, 'Max length is 9 digits'],
    required: true
  },
  birthday: {
    type: Date,
    required: true
  }
});

module.exports = Mongoose.model('Customer', CustomerSchema)