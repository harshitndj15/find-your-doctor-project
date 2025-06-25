import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PatientDashboard from './components/Patient/PatientDashboard';
import DoctorDashboard from './components/Doctor/DoctorDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/patient" 
              element={
                <ProtectedRoute requiredRole="patient">
                  <PatientDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor" 
              element={
                <ProtectedRoute requiredRole="doctor">
                  <DoctorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;