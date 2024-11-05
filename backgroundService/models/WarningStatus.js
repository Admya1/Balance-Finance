const mongoose = require('mongoose');

const warningStatusSchema = new mongoose.Schema({
  lastWarningTimeStamp: {
    type: Date,
    default: null
  },
  isWarningActive: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('WarningStatus', warningStatusSchema);