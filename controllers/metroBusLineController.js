// controllers/metroBusLineController.js
const MetroBusLine = require('../models/MetroBusLine');

// Add Metro Bus Line
exports.addMetroBusLine = async (req, res) => {
  try {
    const { lineName, stations, sameFare, defaultFare } = req.body;

    let updatedStations = stations;
    if (sameFare) {
      updatedStations = stations.map(station => ({
        stationName: station.stationName,
        fare: defaultFare // Apply default fare to all stations
      }));
    }

    const newMetroBusLine = new MetroBusLine({
      lineName,
      stations: updatedStations,
      sameFare,
      defaultFare: sameFare ? defaultFare : null // Store default fare if applicable
    });

    await newMetroBusLine.save();
    res.status(201).json({ message: 'Metro Bus Line added successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add Metro Bus Line' });
  }
};
