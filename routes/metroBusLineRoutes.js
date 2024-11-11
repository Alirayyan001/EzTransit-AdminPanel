// routes/metroBusLineRoutes.js
const express = require('express');
const router = express.Router();
const { addMetroBusLine } = require('../controllers/metroBusLineController');

// Route to add Metro Bus Line
router.post('/add', addMetroBusLine);

module.exports = router;
