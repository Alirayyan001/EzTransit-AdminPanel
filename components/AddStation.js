import axios from 'axios';
import Papa from 'papaparse';
import React, { useState } from 'react';
import '../styles/components/AddStation.css';

const AddStation = () => {
  const [lineName, setLineName] = useState('');
  const [stations, setStations] = useState([{ stationName: '', fare: '' }]);
  const [sameFare, setSameFare] = useState(false);
  const [defaultFare, setDefaultFare] = useState('');
  const [numStations, setNumStations] = useState(1);
  const [importedStations, setImportedStations] = useState([]);
  const [fileError, setFileError] = useState('');
  const [importMethod, setImportMethod] = useState('');

  // Update number of inputs when admin sets the number of stations
  const handleNumStations = () => {
    const newStations = [...Array(parseInt(numStations))].map(() => ({ stationName: '', fare: '' }));
    setStations(newStations);
  };

  const handleStationChange = (index, event) => {
    const { name, value } = event.target;
    const updatedStations = [...stations];
    updatedStations[index] = { ...updatedStations[index], [name]: value };
    setStations(updatedStations);
  };

  const handleCSVImport = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setFileError('');
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const parsedStations = result.data.filter((station) => station.stationName);
          setImportedStations(parsedStations);
          setStations(parsedStations.map((station) => ({ stationName: station.stationName, fare: station.fare })));
          setNumStations(parsedStations.length);
        },
        error: (error) => console.error('Error reading CSV file:', error),
      });
    } else {
      setFileError('Invalid File Format');
    }
  };

  const handleImportedStationChange = (index, event) => {
    const { name, value } = event.target;
    const updatedImportedStations = [...importedStations];
    updatedImportedStations[index] = { ...updatedImportedStations[index], [name]: value };
    setImportedStations(updatedImportedStations);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      lineName,
      stations: importedStations.length > 0 ? importedStations : stations,
      sameFare,
      defaultFare: sameFare ? defaultFare : null,
    };
    try {
      const response = await axios.post('http://localhost:5000/api/metrobus/add', data);
      alert(response.data.message);
    } catch (error) {
      console.error('Error adding metro bus line:', error);
    }
  };

  const handleImportMethodChange = (method) => {
    setImportMethod(method);
    setImportedStations([]);
    setStations([{ stationName: '', fare: '' }]);
    setLineName('');
    setNumStations(1);
    setFileError('');
  };

  return (
    <div className="station-management-container">
      <h2>
        <i className="fas fa-bus"></i> Add Metro Bus Line
      </h2>

      {/* Admin chooses between manual entry or CSV import */}
      <div className="station-management-import-method">
        <label>
          <input
            type="radio"
            value="manual"
            checked={importMethod === 'manual'}
            onChange={() => handleImportMethodChange('manual')}
          />
          <i className="fas fa-keyboard"></i> Enter Stations Manually
        </label>
        <label>
          <input
            type="radio"
            value="csv"
            checked={importMethod === 'csv'}
            onChange={() => handleImportMethodChange('csv')}
          />
          <i className="fas fa-file-csv"></i> Import CSV File
        </label>
      </div>

      {/* Conditional rendering based on admin selection */}
      {importMethod === 'manual' && (
        <form onSubmit={handleSubmit}>
          <div className="station-management-form-group">
            <label><i className="fas fa-map-signs"></i> Line Name:</label>
            <input
              type="text"
              value={lineName}
              onChange={(e) => setLineName(e.target.value)}
              required
            />
          </div>

          <div className="station-management-form-group">
            <label><i className="fas fa-plus-circle"></i> How many stations to add?</label>
            <input
              type="number"
              value={numStations}
              onChange={(e) => setNumStations(e.target.value)}
              min="1"
              required
            />
            <button type="button" onClick={handleNumStations}>
              Set Stations
            </button>
          </div>

          {stations.map((station, index) => (
            <div key={index} className="station-management-entry">
              <label><i className="fas fa-flag"></i> Station Name:</label>
              <input
                type="text"
                name="stationName"
                value={station.stationName}
                onChange={(e) => handleStationChange(index, e)}
                required
              />
              {!sameFare && (
                <>
                  <label><i className="fas fa-money-bill-wave"></i> Fare:</label>
                  <input
                    type="number"
                    name="fare"
                    value={station.fare}
                    onChange={(e) => handleStationChange(index, e)}
                    required
                  />
                </>
              )}
            </div>
          ))}

          <div className="station-management-form-group station-management-apply-same-fare">
            <label>
              <input
                type="checkbox"
                checked={sameFare}
                onChange={() => setSameFare(!sameFare)}
              />
              <i className="fas fa-equals"></i> Apply same fare to all stations
            </label>
          </div>

          {sameFare && (
            <div className="station-management-form-group">
              <label><i className="fas fa-coins"></i> Default Fare:</label>
              <input
                type="number"
                value={defaultFare}
                onChange={(e) => setDefaultFare(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit"><i className="fas fa-check-circle"></i> Submit</button>
        </form>
      )}

      {importMethod === 'csv' && (
        <div className="station-management-csv-upload">
          <label><i className="fas fa-upload"></i> Import CSV File:</label>
          <input type="file" accept=".csv" onChange={handleCSVImport} />
          {fileError && <p className="station-management-error-message"><i className="fas fa-exclamation-triangle"></i> {fileError}</p>}

          <div className="station-management-form-group">
            <label><i className="fas fa-map-signs"></i> Line Name:</label>
            <input
              type="text"
              value={lineName}
              onChange={(e) => setLineName(e.target.value)}
              required
            />
          </div>

          {importedStations.length > 0 && (
            <div className="station-management-csv-data">
              <h3><i className="fas fa-edit"></i> Imported Stations (Editable):</h3>
              {importedStations.map((station, index) => (
                <div key={index} className="station-management-entry">
                  <label><i className="fas fa-flag"></i> Station Name:</label>
                  <input
                    type="text"
                    name="stationName"
                    value={station.stationName}
                    onChange={(e) => handleImportedStationChange(index, e)}
                    required
                  />
                  <label><i className="fas fa-money-bill-wave"></i> Fare:</label>
                  <input
                    type="number"
                    name="fare"
                    value={station.fare}
                    onChange={(e) => handleImportedStationChange(index, e)}
                    required
                  />
                </div>
              ))}

              <button onClick={handleSubmit}><i className="fas fa-save"></i> Submit CSV Data</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddStation;