const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');

// Route to add a new station
router.post('/add', stationController.addStation);

// Route to get all stations
router.get('/all', stationController.getAllStations);

// Route to get a single station by ID
router.get('/:id', stationController.getStationById);

module.exports = router;
