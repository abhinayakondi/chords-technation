import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Avatar,
  Badge,
  Divider,
} from '@mui/material';
import { Notifications } from '@mui/icons-material';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ConsentStatusCard from '../../components/dashboard/ConsentStatusCard';
import QuickActions from '../../components/dashboard/QuickActions';

// Mock data - In real app, this would come from an API
const mockPatientData = {
  name: 'John Doe',
  lastLogin: '2024-02-20T10:30:00',
  notifications: 3,
  consentStatus: {
    approved: 5,
    pending: 2,
    revoked: 1,
    total: 8,
  },
};

const PatientDashboard: React.FC = () => {
  const content = (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
        <Grid item>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: 'primary.main',
              fontSize: '1.5rem',
            }}
          >
            {mockPatientData.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
        </Grid>
        <Grid item xs>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome back, {mockPatientData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last login: {new Date(mockPatientData.lastLogin).toLocaleString()}
          </Typography>
        </Grid>
        <Grid item>
          <Badge badgeContent={mockPatientData.notifications} color="error">
            <Notifications color="action" sx={{ fontSize: 28 }} />
          </Badge>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Consent Status Overview */}
        <Grid item xs={12}>
          <ConsentStatusCard status={mockPatientData.consentStatus} />
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <QuickActions />
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Recent Activity</Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: 'pointer' }}
              >
                View All
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary" align="center">
              No recent activity to display
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );

  return <DashboardLayout>{content}</DashboardLayout>;
};

export default PatientDashboard; 