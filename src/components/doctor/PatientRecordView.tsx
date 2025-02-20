import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Alert,
} from '@mui/material';
import { AccessTime, Warning } from '@mui/icons-material';
import { Patient } from '../../types/doctor';
import { testHealthRecords } from '../../utils/testData';

interface PatientRecordViewProps {
  patient: Patient;
  expiryTime: string;
  onSessionEnd: () => void;
}

const PatientRecordView: React.FC<PatientRecordViewProps> = ({
  patient,
  expiryTime,
  onSessionEnd,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const timeRemaining = new Date(expiryTime).getTime() - new Date().getTime();
  const isExpiringSoon = timeRemaining < 300000; // 5 minutes

  return (
    <Box sx={{ py: 4 }}>
      <Alert 
        severity={isExpiringSoon ? "warning" : "info"} 
        sx={{ mb: 3 }}
        icon={isExpiringSoon ? <Warning /> : <AccessTime />}
        action={
          <Button color="inherit" size="small" onClick={onSessionEnd}>
            End Session
          </Button>
        }
      >
        {isExpiringSoon
          ? "Session expiring soon! Please save any changes."
          : `Session expires at ${new Date(expiryTime).toLocaleTimeString()}`}
      </Alert>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Patient Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Name:</strong> {patient.name}
            </Typography>
            <Typography variant="body1">
              <strong>Health Card Number:</strong> {patient.healthCardNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Date of Birth:</strong> {new Date(patient.dateOfBirth).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              <strong>Province:</strong> {patient.homeProvince}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="patient records tabs"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Health Records" />
          <Tab label="Lab Results" />
          <Tab label="Medications" />
          <Tab label="Clinical Notes" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {selectedTab === 0 && (
            <Grid container spacing={3}>
              {testHealthRecords.map((record) => (
                <Grid item xs={12} key={record.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6">
                          {record.title}
                        </Typography>
                        <Chip
                          label={record.status}
                          color={record.status === 'final' ? 'success' : 'warning'}
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {record.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Provider: {record.provider.name} - {record.provider.organization}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Date: {new Date(record.date).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          {selectedTab === 1 && (
            <Typography>Lab results content</Typography>
          )}
          {selectedTab === 2 && (
            <Typography>Medications content</Typography>
          )}
          {selectedTab === 3 && (
            <Typography>Clinical notes content</Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default PatientRecordView; 