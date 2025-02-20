import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { theme } from './theme/theme';
import LoginPage from './pages/auth/LoginPage';
import PatientDashboard from './pages/dashboard/PatientDashboard';
import ConsentManagement from './pages/consent/ConsentManagement';
import AuditLogs from './pages/audit/AuditLogs';
import HealthRecords from './pages/health/HealthRecords';
import EmergencyAccess from './pages/emergency/EmergencyAccess';
import Notifications from './pages/notifications/Notifications';
import DoctorWorkflow from './pages/doctor/DoctorWorkflow';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppRoutes() {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <Routes>
      <Route path="/doctor" element={<DoctorWorkflow />} />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <PatientDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/health-records"
        element={
          isAuthenticated ? (
            <HealthRecords />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/consent-management"
        element={
          isAuthenticated ? (
            <ConsentManagement />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/audit-logs"
        element={
          isAuthenticated ? (
            <AuditLogs />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/emergency-access"
        element={
          isAuthenticated ? (
            <EmergencyAccess />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/notifications"
        element={
          isAuthenticated ? (
            <Notifications />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={userRole === 'doctor' ? '/doctor' : '/dashboard'} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <Router>
            <AppRoutes />
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App; 