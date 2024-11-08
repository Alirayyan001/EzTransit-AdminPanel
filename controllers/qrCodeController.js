// controllers/qrCodeController.js

const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const QrCode = require('../models/qrCodeModel'); // Ensure correct path

// Helper function to sanitize filenames
const sanitizeFileName = (filename) => {
  return filename.replace(/[^a-z0-9_\-\.]/gi, '_');
};

// Function to generate QR code
const generateQrCode = async (req, res) => {
  try {
    const { stationName, fare, type } = req.body;

    // Generate Station ID automatically
    const stationID = `STN-${Date.now()}`;

    // Validate inputs
    if (!stationName || fare == null || !type) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if a QR code already exists for this stationID
    const existingQrCode = await QrCode.findOne({ stationID });
    if (existingQrCode) {
      return res.status(400).json({ success: false, message: 'QR code for this stationID already exists' });
    }

    // Prepare data to encode in QR code
    const qrData = `${stationName}|${fare}|${type}`;

    // Define filename and path
    const rawFileName = `${stationName}_${type}.png`;
    const fileName = sanitizeFileName(rawFileName);
    const qrDir = path.join(__dirname, '..', 'qr-codes');
    const filePath = path.join(qrDir, fileName);

    // Ensure qr-codes directory exists
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir, { recursive: true });
    }

    // Generate QR code and save to file
    await QRCode.toFile(filePath, qrData);

    // Save QR code details to MongoDB
    const newQrCode = new QrCode({
      stationID,
      stationName,
      fare,
      type,
      qrCodeImage: fileName
    });

    await newQrCode.save();

    // Respond with download link
    res.status(201).json({
      success: true,
      message: 'QR code generated successfully',
      downloadLink: `/api/qrcodes/download/${fileName}`
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ success: false, message: 'Error generating QR code', error: error.message });
  }
};

// Function to download QR code
const downloadQrCode = async (req, res) => {
  try {
    const { fileName } = req.params;
    const qrDir = path.join(__dirname, '..', 'qr-codes');
    const filePath = path.join(qrDir, fileName);

    // Check if file exists
    if (fs.existsSync(filePath)) {
      res.download(filePath, fileName, (err) => {
        if (err) {
          console.error('Error downloading file:', err);
          res.status(500).json({ success: false, message: 'Error downloading file' });
        }
      });
    } else {
      res.status(404).json({ success: false, message: 'QR code not found' });
    }
  } catch (error) {
    console.error('Error downloading QR code:', error);
    res.status(500).json({ success: false, message: 'Error downloading QR code', error: error.message });
  }
};

module.exports = { generateQrCode, downloadQrCode };
