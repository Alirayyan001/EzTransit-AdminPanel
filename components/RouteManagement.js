import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../styles/components/RouteManagement.css';

const RouteManagement = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="route-container">
      <div className="route-content">
        <FontAwesomeIcon 
          icon={faArrowLeft} 
          onClick={handleBackClick} 
          className="route-back-icon"
        />
        <img src={logo} alt="EZ-Transit Logo" className="route-logo" />
        <h2>Route Management</h2>
        <div className="route-buttons">
          <div className="route-button" onClick={() => navigate('/add-routes')}>
            <h3>Add<br />Route</h3>
            <button>Add New<br />Route</button>
          </div>
          <div className="route-button" onClick={() => navigate('/manage-routes')}>
            <h3>Manage<br />Routes</h3>
            <button>Manage Old<br />Routes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteManagement;
