// models/MetroBusLine.js
const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  stationName: { type: String, required: true },
  fare: { type: Number, required: true }
});

const metroBusLineSchema = new mongoose.Schema({
  lineName: { type: String, required: true }, // e.g., "Green Line Metro Bus"
  stations: [stationSchema], // Array of stations with fare
  sameFare: { type: Boolean, default: false }, // Option to apply same fare to all stations
  defaultFare: { type: Number } // Fare if `sameFare` is true
});

module.exports = mongoose.model('MetroBusLine', metroBusLineSchema);
