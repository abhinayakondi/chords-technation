import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Switch,
  FormControlLabel,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Divider,
} from '@mui/material';
import { Warning, Lock, LockOpen } from '@mui/icons-material';
import DashboardLayout from '../../components/layout/DashboardLayout';

const EmergencyAccess: React.FC = () => {
  const [emergencyAccessEnabled, setEmergencyAccessEnabled] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleEmergencyAccessToggle = () => {
    if (!emergencyAccessEnabled) {
      setConfirmDialogOpen(true);
    } else {
      setEmergencyAccessEnabled(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  };

  const handleConfirmEmergencyAccess = () => {
    if (confirmationCode === '123456') { // In real app, validate with backend
      setEmergencyAccessEnabled(true);
      setConfirmDialogOpen(false);
      setConfirmationCode('');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Emergency Access Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Configure emergency access settings for healthcare providers in urgent situations.
        </Typography>

        {showSuccessMessage && (
          <Alert 
            severity={emergencyAccessEnabled ? "warning" : "success"} 
            sx={{ mb: 3 }}
          >
            {emergencyAccessEnabled 
              ? "Emergency access has been enabled. Healthcare providers can now access your records in urgent situations."
              : "Emergency access has been disabled. Your records are now under normal access controls."
            }
          </Alert>
        )}

        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {emergencyAccessEnabled ? (
              <LockOpen color="warning" sx={{ fontSize: 32, mr: 2 }} />
            ) : (
              <Lock color="success" sx={{ fontSize: 32, mr: 2 }} />
            )}
            <Box>
              <Typography variant="h6" gutterBottom>
                Emergency Access Control
              </Typography>
              <Typography variant="body2" color="text.secondary">
                When enabled, healthcare providers can access your records in emergency situations
                without standard authorization.
              </Typography>
            </Box>
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={emergencyAccessEnabled}
                onChange={handleEmergencyAccessToggle}
                color={emergencyAccessEnabled ? "warning" : "success"}
              />
            }
            label={emergencyAccessEnabled ? "Enabled" : "Disabled"}
          />
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Important Information
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                What is Emergency Access?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Emergency access allows healthcare providers to view your medical records
                in urgent situations when you might be unable to provide consent.
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                When is it Used?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This feature is only used in critical medical situations where immediate
                access to your health information could be vital for your care.
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Security Measures
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All emergency access events are logged and monitored. You'll be notified
                when your records are accessed through emergency protocols.
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Dialog
          open={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Warning color="warning" />
              <Typography variant="h6">
                Enable Emergency Access
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" paragraph sx={{ mt: 1 }}>
              Please enter the verification code sent to your registered phone number
              to enable emergency access.
            </Typography>
            <TextField
              fullWidth
              label="Verification Code"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              type="number"
              autoFocus
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={handleConfirmEmergencyAccess}
              disabled={confirmationCode.length !== 6}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </DashboardLayout>
  );
};

export default EmergencyAccess; 