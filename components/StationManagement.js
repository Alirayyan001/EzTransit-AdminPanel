import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../styles/components/StationManagement.css';

const StationManagement = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="station-container">
      <div className="station-content">
        <FontAwesomeIcon 
          icon={faArrowLeft} 
          onClick={handleBackClick} 
          className="station-back-icon"
        />
        <img src={logo} alt="EZ-Transit Logo" className="station-logo" />
        <h2>Station Management</h2>
        <div className="station-buttons">
          <div className="station-button" onClick={() => navigate('/add-stations')}>
            <h3>Add<br />Station</h3>
            <button>Add New<br />Station</button>
          </div>
          <div className="station-button" onClick={() => navigate('/manage-stations')}>
            <h3>Manage<br />Stations</h3>
            <button>Manage Old<br />Stations</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationManagement;
