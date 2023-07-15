const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataPost = new Schema({
  no_docs: {
    type: Number,
    required: true
  },
  date_in: {
    type: String,
    required: true
  }, 
  date_out: {
    type: String,
    required: false
  },
  sumber: {
    type: String,
    required: true
  }, 
  jenis: {
    type: String,
    required: true
  }, 
  b3_in: {
    type: String,
    required: true
  },
  status:{
    type: Boolean,
    required: false 
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('data', DataPost);
