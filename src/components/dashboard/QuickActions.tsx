import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
} from '@mui/material';
import {
  ManageAccounts,
  Assessment,
  LocalHospital,
  Notifications,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const quickActions = [
  {
    title: 'Manage Consent',
    description: 'View & update access permissions',
    icon: ManageAccounts,
    path: '/consent-management',
    color: 'primary.main',
  },
  {
    title: 'View Audit Logs',
    description: 'Track who accessed your data',
    icon: Assessment,
    path: '/audit-logs',
    color: 'secondary.main',
  },
  {
    title: 'Emergency Access',
    description: 'View urgent access requests',
    icon: LocalHospital,
    path: '/emergency-access',
    color: 'error.main',
  },
  {
    title: 'Notifications',
    description: 'View alerts and updates',
    icon: Notifications,
    path: '/notifications',
    color: 'warning.main',
  },
];

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      {quickActions.map((action) => {
        const Icon = action.icon;
        return (
          <Grid item xs={12} sm={6} key={action.title}>
            <Card>
              <CardActionArea onClick={() => navigate(action.path)}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Icon
                      sx={{
                        fontSize: 32,
                        color: action.color,
                        mr: 2,
                      }}
                    />
                    <Box>
                      <Typography variant="h6" component="div">
                        {action.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {action.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default QuickActions; 