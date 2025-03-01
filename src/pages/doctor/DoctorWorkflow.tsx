import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Container,
  LinearProgress,
  Alert,
  Button,
} from '@mui/material';
import DoctorLogin from '../../components/doctor/DoctorLogin';
import PatientSearch from '../../components/doctor/PatientSearch';
import VisitReasonSelect from '../../components/doctor/VisitReasonSelect';
import PatientAuthentication from '../../components/doctor/PatientAuthentication';
import PatientRecordView from '../../components/doctor/PatientRecordView';
import {
  DoctorCredentials,
  Patient,
  VisitReason,
  AuthenticationRequest,
  PatientAuthenticationStatus,
} from '../../types/doctor';
import DashboardLayout from '../../components/layout/DashboardLayout';

const steps = [
  'Doctor Login',
  'Patient Search',
  'Visit Reason',
  'Patient Authentication',
  'Access Records',
];

const DoctorWorkflow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [visitReason, setVisitReason] = useState<VisitReason | null>(null);
  const [authStatus, setAuthStatus] = useState<PatientAuthenticationStatus | null>(null);
  const [sessionExpiry, setSessionExpiry] = useState<Date | null>(null);

  const handleDoctorLogin = async (credentials: DoctorCredentials) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call for doctor authentication using credentials
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Logging in with:', credentials);  // Use credentials
      setSessionExpiry(new Date(Date.now() + 8 * 60 * 60 * 1000)); // 8-hour session
      setActiveStep(1);
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handlePatientSearch = async (query: string): Promise<Patient[]> => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call for patient search using query
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Searching with query:', query);  // Use query
      return [
        {
          id: '1',
          name: 'John Doe',
          healthCardNumber: 'ON1234567',
          dateOfBirth: '1980-01-01',
          homeProvince: 'Ontario',
          digitalHealthId: 'DHI123456',
        },
        {
          id: '2',
          name: 'Jane Smith',
          healthCardNumber: 'BC9876543',
          dateOfBirth: '1975-05-15',
          homeProvince: 'British Columbia',
          digitalHealthId: 'DHI789012',
        },
      ];
    } catch (error) {
      setError('Failed to search for patients. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setActiveStep(2);
  };

  const handleVisitReasonSelect = (reason: VisitReason) => {
    setVisitReason(reason);
  };

  const handleVisitReasonConfirm = () => {
    setActiveStep(3);
  };

  const handlePatientAuthenticate = async (request: AuthenticationRequest) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call for patient authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAuthStatus({
        isAuthenticated: true,
        method: request.authenticationType,
        timestamp: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour expiry
      });
      setActiveStep(4);
    } catch (error) {
      setError('Authentication failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleStepBack = () => {
    setActiveStep((prevStep) => Math.max(0, prevStep - 1));
  };

  const handleReset = () => {
    setActiveStep(0);
    setError(null);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <DoctorLogin onLogin={handleDoctorLogin} />;
      case 1:
        return (
          <PatientSearch
            onSearch={handlePatientSearch}
            onSelectPatient={handlePatientSelect}
          />
        );
      case 2:
        return (
          <VisitReasonSelect
            onSelect={handleVisitReasonSelect}
            selectedReason={visitReason}
            onConfirm={handleVisitReasonConfirm}
          />
        );
      case 3:
        return selectedPatient ? (
          <PatientAuthentication
            patient={selectedPatient}
            onAuthenticate={handlePatientAuthenticate}
            onCancel={() => setActiveStep(2)}
          />
        ) : null;
      case 4:
        return selectedPatient && authStatus?.expiresAt ? (
          <Container maxWidth="lg">
            <PatientRecordView
              patient={selectedPatient}
              expiryTime={authStatus.expiresAt}
              onSessionEnd={handleReset}
            />
          </Container>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ width: '100%' }}>
        {loading && <LinearProgress sx={{ mb: 2 }} />}
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {sessionExpiry && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Session expires at: {sessionExpiry.toLocaleTimeString()}
          </Alert>
        )}

        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent()}

        {activeStep > 0 && activeStep < steps.length - 1 && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-start' }}>
            <Button onClick={handleStepBack}>Back</Button>
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
};

export default DoctorWorkflow; 