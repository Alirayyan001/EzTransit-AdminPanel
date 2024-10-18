import { faBullhorn, faBus, faQrcode, faRoute, faSignOutAlt, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../styles/components/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admindashboard-container">
      <div className="admindashboard-content">
        <img src={logo} alt="EZ-Transit Logo" className="adminlogo" />
        <h2>Admin Dashboard</h2>
        <div className="admindashboard-buttons">
          <div className="admindashboard-button" onClick={() => navigate('/user-management')}>
            <FontAwesomeIcon icon={faUser} className="admindashboard-icon" />
            <h3>User<br />Management</h3>
            <button>Manage<br />Users</button>
          </div>
          <div className="admindashboard-button" onClick={() => navigate('/topup-approval')}>
            <FontAwesomeIcon icon={faWallet} className="admindashboard-icon" />
            <h3>Topup<br />Management</h3>
            <button>Manage<br />Topups</button>
          </div>
          <div className="admindashboard-button" onClick={() => navigate('/announcement')}>
            <FontAwesomeIcon icon={faBullhorn} className="admindashboard-icon" />
            <h3>Announcement<br />Management</h3>
            <button>Manage<br />Announcements</button>
          </div>
          <div className="admindashboard-button" onClick={() => navigate('/station-management')}>
            <FontAwesomeIcon icon={faBus} className="admindashboard-icon" />
            <h3>Station<br />Management</h3>
            <button>Manage<br />Stations</button>
          </div>
          <div className="admindashboard-button" onClick={() => navigate('/qr-management')}>
            <FontAwesomeIcon icon={faQrcode} className="admindashboard-icon" />
            <h3>QR Code<br />Management</h3>
            <button>Manage<br />QR Codes</button>
          </div>
            <div className="admindashboard-button" onClick={() => navigate('/route-management')}>
            <FontAwesomeIcon icon={faRoute} className="admindashboard-icon" />
            <h3>Route<br />Management</h3>
            <button>Manage<br />Routes</button>
          </div>
        </div>
        <button className="adminlogout-button" onClick={() => navigate('/logout')}>
          <FontAwesomeIcon icon={faSignOutAlt} className="adminlogout-icon" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
