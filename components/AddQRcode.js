import axios from 'axios';
import React, { useState } from 'react';

const AddQRcode = () => {
  const [stationID, setStationID] = useState('');
  const [stationName, setStationName] = useState('');
  const [fare, setFare] = useState('');
  const [type, setType] = useState('entry');
  const [message, setMessage] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const handleGenerateQrCode = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to generate QR code
      const response = await axios.post('http://localhost:5000/api/qrcodes/generate', {
        stationID,
        stationName,
        fare: parseFloat(fare),
        type
      });

      if (response.data.success) {
        setMessage('QR code generated successfully.');
        setDownloadLink(`http://localhost:5000${response.data.downloadLink}`); // Complete URL
      } else {
        setMessage('Failed to generate QR code.');
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      setMessage(error.response?.data?.message || 'An error occurred while generating QR code.');
    }
  };

  return (
    <div className="add-qrcode-container">
      <h2>Add New QR Code</h2>
      <form onSubmit={handleGenerateQrCode} className="add-qrcode-form">
        <div className="form-group">
          <label>Station ID:</label>
          <input
            type="text"
            value={stationID}
            onChange={(e) => setStationID(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Station Name:</label>
          <input
            type="text"
            value={stationName}
            onChange={(e) => setStationName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Fare:</label>
          <input
            type="number"
            value={fare}
            onChange={(e) => setFare(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="entry">Entry</option>
            <option value="exit">Exit</option>
          </select>
        </div>

        <button type="submit">Generate QR Code</button>
      </form>

      {/* Message display */}
      {message && <p className="message">{message}</p>}

      {/* Download link */}
      {downloadLink && (
        <div className="download-link">
          <a href={downloadLink} download>
            Download QR Code
          </a>
        </div>
      )}
    </div>
  );
};

export default AddQRcode;
