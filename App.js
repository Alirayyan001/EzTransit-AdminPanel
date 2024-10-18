import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddAnnouncement from './components/AddAnnouncement';
import AddQRcode from './components/AddQRcode';
import AddRoute from './components/AddRoute';
import AddStation from './components/AddStation';
import Announcement from './components/Announcement';
import Approved from './components/Approved';
import Dashboard from './components/Dashboard';
import Declined from './components/Declined';
import Login from './components/Login';
import Logout from './components/Logout';
import ManageAnnouncements from './components/ManageAnnouncements';
import ManageQRcode from './components/ManageQRcode';
import ManageRoute from './components/ManageRoute';
import ManageStation from './components/ManageStation';
import Pending from './components/Pending';
import QRManagement from './components/QRManagement';
import RouteManagement from './components/RouteManagement';
import StationManagement from './components/StationManagement';
import TopupApproval from './components/TopupApproval';
import UserManagement from './components/UserManagement';


import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/user-management/:userId" element={<UserManagement />} />
        <Route path="/topup-approval" element={<TopupApproval />} />
        <Route path="/approved" element={<Approved />} />
        <Route path="/declined" element={<Declined />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/add-announcement" element={<AddAnnouncement />} />
        <Route path="/manage-announcements" element={<ManageAnnouncements />} />
        <Route path="/qr-management" element={<QRManagement />} />
        <Route path="/station-management" element={<StationManagement />} />
        <Route path="/route-management" element={<RouteManagement />} />
        <Route path="/add-routes" element={<AddRoute />} />
        <Route path="/manage-routes" element={<ManageRoute />} />
        <Route path="/add-qrcodes" element={<AddQRcode />} />
        <Route path="/manage-qrcodes" element={<ManageQRcode />} />
        <Route path="/add-stations" element={<AddStation />} />
        <Route path="/manage-stations" element={<ManageStation />} />

        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
