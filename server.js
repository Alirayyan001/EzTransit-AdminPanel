// server.js file for admin panel backend

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve qr-codes folder statically for direct access
app.use('/qr-codes', express.static(path.join(__dirname, 'qr-codes')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/EZ-TRANSIT')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import Routes
const userRoutes = require('./routes/userRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const topupRoutes = require('./routes/topupRoutes');
const metroBusLineRoutes = require('./routes/metroBusLineRoutes');
const stationRoutes = require('./routes/stationRoutes');
const qrCodeRoutes = require('./routes/qrCodeRoutes');  // New QR Code Routes

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/topups', topupRoutes);
app.use('/api/metrobus', metroBusLineRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/qrcodes', qrCodeRoutes);  // Use new QR Code routes

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
