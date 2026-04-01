import React from 'react';
import Navbar from '../components/Navbar';
import AdminDashboard from '../components/AdminDashboard';
import '../styles/adminPage.css';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-main">
        <AdminDashboard />
      </div>
    </div>
  );
};

export default AdminPage;
