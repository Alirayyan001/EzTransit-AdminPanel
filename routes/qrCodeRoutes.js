// routes/qrCodeRoutes.js

const express = require('express');
const router = express.Router();
const { generateQrCode, downloadQrCode } = require('../controllers/qrCodeController'); // Ensure the path is correct

// Route to generate QR code
router.post('/generate', generateQrCode);

// Route to download QR code
router.get('/download/:fileName', downloadQrCode);

module.exports = router;
