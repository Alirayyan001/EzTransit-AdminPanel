const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
  stationID: {
    type: String,
    required: true,
    unique: true
  },
  stationName: {
    type: String,
    required: true
  },
  fare: {
    type: Number,
    required: true
  },
  qrImage: {
    type: String,
    required: true // Store QR code as base64 string
  }
});

const Station = mongoose.model('Station', StationSchema);
module.exports = Station;
