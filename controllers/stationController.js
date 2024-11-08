const Station = require('../models/Station');
const QRCode = require('qrcode');

// Add a new station and generate a QR code
exports.addStation = async (req, res) => {
  const { stationName, fare } = req.body;
  const stationID = `station-${Date.now()}`; // Unique ID for the station

  try {
    // Include station details in the QR code data
    const qrData = JSON.stringify({
      stationID,
      stationName,
      fare
    });

    // Generate a QR code with the updated data
    const qrImage = await QRCode.toDataURL(qrData);

    // Create and save the new station document in MongoDB
    const newStation = new Station({ stationID, stationName, fare, qrImage });
    await newStation.save();

    res.status(201).json({ message: 'Station and QR Code generated successfully', newStation });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add station', error: error.message });
  }
};

// Get all stations
exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stations', error: error.message });
  }
};

// Get a single station by ID
exports.getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch station', error: error.message });
  }
};
