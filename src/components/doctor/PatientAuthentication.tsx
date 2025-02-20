import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Container,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Stack,
  Divider,
} from '@mui/material';
import { Fingerprint, Sms } from '@mui/icons-material';
import { AuthenticationRequest, Patient } from '../../types/doctor';

interface PatientAuthenticationProps {
  patient: Patient;
  onAuthenticate: (request: AuthenticationRequest) => Promise<void>;
  onCancel: () => void;
}

const PatientAuthentication: React.FC<PatientAuthenticationProps> = ({
  patient,
  onAuthenticate,
  onCancel,
}) => {
  const [authMethod, setAuthMethod] = useState<'biometric' | 'otp' | null>(null);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  const handleBiometricAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      await onAuthenticate({
        patientId: patient.id,
        authenticationType: 'biometric',
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Biometric authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtpSent(true);
      setAuthMethod('otp');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return;

    setLoading(true);
    setError(null);
    try {
      await onAuthenticate({
        patientId: patient.id,
        authenticationType: 'otp',
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Patient Authentication Required
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Please have the patient authenticate to grant access to their records
        </Typography>

        <Paper sx={{ p: 3, mt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={3}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Patient Information
              </Typography>
              <Typography variant="body1">
                Name: {patient.name}
                <br />
                Health Card Number: {patient.healthCardNumber}
                <br />
                Province: {patient.homeProvince}
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" gutterBottom>
                Choose Authentication Method
              </Typography>

              <Stack spacing={2}>
                <Button
                  variant={authMethod === 'biometric' ? 'contained' : 'outlined'}
                  startIcon={<Fingerprint />}
                  onClick={() => setAuthMethod('biometric')}
                  disabled={loading}
                  fullWidth
                >
                  Use Biometric Authentication
                </Button>

                <Button
                  variant={authMethod === 'otp' ? 'contained' : 'outlined'}
                  startIcon={<Sms />}
                  onClick={() => setAuthMethod('otp')}
                  disabled={loading}
                  fullWidth
                >
                  Use OTP Authentication
                </Button>
              </Stack>
            </Box>

            {authMethod === 'biometric' && (
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleBiometricAuth}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <Fingerprint />}
                >
                  Start Biometric Verification
                </Button>
              </Box>
            )}

            {authMethod === 'otp' && (
              <Box>
                {!otpSent ? (
                  <Button
                    variant="contained"
                    onClick={handleSendOtp}
                    disabled={loading}
                    fullWidth
                  >
                    Send OTP to Patient
                  </Button>
                ) : (
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      disabled={loading}
                    />
                    <Button
                      variant="contained"
                      onClick={handleVerifyOtp}
                      disabled={loading || !otp}
                      fullWidth
                    >
                      Verify OTP
                    </Button>
                    <Button
                      variant="text"
                      onClick={handleSendOtp}
                      disabled={loading}
                    >
                      Resend OTP
                    </Button>
                  </Stack>
                )}
              </Box>
            )}
          </Stack>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default PatientAuthentication; 