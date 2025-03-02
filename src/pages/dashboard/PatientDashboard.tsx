import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Avatar,
  Badge,
  Divider,
  Card,
  CardContent,
  IconButton,
  Button,
  useTheme,
} from '@mui/material';
import {
  Notifications,
  TrendingUp,
  TrendingDown,
  MoreVert,
  CheckCircle,
  Warning,
  Block,
  ArrowForward,
} from '@mui/icons-material';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ConsentStatusCard from '../../components/dashboard/ConsentStatusCard';
import QuickActions from '../../components/dashboard/QuickActions';

// Mock data - In real app, this would come from an API
const mockPatientData = {
  name: 'Alex Morgan',
  lastLogin: '2024-02-20T10:30:00',
  notifications: 3,
  consentStatus: {
    approved: 5,
    pending: 2,
    revoked: 1,
    total: 8,
  },
  recentActivity: [
    {
      id: '1',
      type: 'access',
      title: 'Record Access',
      description: 'Dr. Sarah Smith accessed your lab results',
      timestamp: '2024-02-20T09:30:00',
      status: 'approved',
    },
    {
      id: '2',
      type: 'consent',
      title: 'Consent Request',
      description: 'New consent request from City General Hospital',
      timestamp: '2024-02-19T15:45:00',
      status: 'pending',
    },
    {
      id: '3',
      type: 'update',
      title: 'Record Update',
      description: 'New lab results have been added to your records',
      timestamp: '2024-02-19T11:20:00',
      status: 'info',
    },
  ],
  stats: {
    accessRequests: { count: 12, trend: 8.5, up: true },
    activeConsents: { count: 5, trend: -2.3, up: false },
    pendingRequests: { count: 3, trend: 0, up: true },
  },
};

const PatientDashboard: React.FC = () => {
  const theme = useTheme();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle sx={{ color: theme.palette.success.main }} />;
      case 'pending':
        return <Warning sx={{ color: theme.palette.warning.main }} />;
      case 'rejected':
        return <Block sx={{ color: theme.palette.error.main }} />;
      default:
        return null;
    }
  };

  const StatCard = ({ title, value, trend, up }: { title: string; value: number; trend: number; up: boolean }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <IconButton size="small">
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="h4" component="div" sx={{ my: 2, fontWeight: 'bold' }}>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {up ? (
            <TrendingUp sx={{ color: theme.palette.success.main }} />
          ) : (
            <TrendingDown sx={{ color: theme.palette.error.main }} />
          )}
          <Typography
            variant="body2"
            color={up ? 'success.main' : 'error.main'}
            fontWeight="medium"
          >
            {trend}% {up ? 'increase' : 'decrease'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                sx={{
                  width: 72,
                  height: 72,
                  bgcolor: 'primary.main',
                  fontSize: '2rem',
                }}
              >
                {mockPatientData.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Welcome back, {mockPatientData.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Last login: {new Date(mockPatientData.lastLogin).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item>
              <Badge badgeContent={mockPatientData.notifications} color="error">
                <IconButton size="large" color="primary">
                  <Notifications sx={{ fontSize: 28 }} />
                </IconButton>
              </Badge>
            </Grid>
          </Grid>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <StatCard
              title="Access Requests"
              value={mockPatientData.stats.accessRequests.count}
              trend={mockPatientData.stats.accessRequests.trend}
              up={mockPatientData.stats.accessRequests.up}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard
              title="Active Consents"
              value={mockPatientData.stats.activeConsents.count}
              trend={mockPatientData.stats.activeConsents.trend}
              up={mockPatientData.stats.activeConsents.up}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard
              title="Pending Requests"
              value={mockPatientData.stats.pendingRequests.count}
              trend={mockPatientData.stats.pendingRequests.trend}
              up={mockPatientData.stats.pendingRequests.up}
            />
          </Grid>
        </Grid>

        {/* Consent Status */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">Consent Overview</Typography>
                  <Button
                    endIcon={<ArrowForward />}
                    onClick={() => {}}
                  >
                    View All
                  </Button>
                </Box>
                <ConsentStatusCard status={mockPatientData.consentStatus} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {mockPatientData.recentActivity.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', py: 2 }}>
                        <Box sx={{ mr: 2 }}>
                          {getStatusIcon(activity.status)}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" fontWeight="medium">
                            {activity.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {activity.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(activity.timestamp).toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                      {index < mockPatientData.recentActivity.length - 1 && (
                        <Divider />
                      )}
                    </React.Fragment>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <QuickActions />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default PatientDashboard; 