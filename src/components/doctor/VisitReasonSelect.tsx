import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { VisitReason, VisitReasonOption } from '../../types/doctor';

const visitReasonOptions: VisitReasonOption[] = [
  {
    value: 'emergency_care',
    label: 'Emergency Care',
    description: 'Immediate medical attention required for acute conditions',
  },
  {
    value: 'consultation',
    label: 'Consultation',
    description: 'General medical consultation or second opinion',
  },
  {
    value: 'referral',
    label: 'Referral',
    description: 'Patient referred by another healthcare provider',
  },
  {
    value: 'follow_up',
    label: 'Follow-up',
    description: 'Follow-up visit for existing condition or treatment',
  },
  {
    value: 'specialist_visit',
    label: 'Specialist Visit',
    description: 'Specialized medical consultation',
  },
];

interface VisitReasonSelectProps {
  onSelect: (reason: VisitReason) => void;
  selectedReason: VisitReason | null;
  onConfirm: () => void;
}

const VisitReasonSelect: React.FC<VisitReasonSelectProps> = ({
  onSelect,
  selectedReason,
  onConfirm,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(event.target.value as VisitReason);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Select Reason for Visit
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Please select the primary reason for accessing this patient's records
        </Typography>

        <Paper sx={{ p: 3, mt: 2 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Visit Reason</FormLabel>
            <RadioGroup
              aria-label="visit-reason"
              name="visit-reason"
              value={selectedReason || ''}
              onChange={handleChange}
            >
              {visitReasonOptions.map((option) => (
                <Box key={option.value} sx={{ mb: 2 }}>
                  <FormControlLabel
                    value={option.value}
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1">{option.label}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {option.description}
                        </Typography>
                      </Box>
                    }
                  />
                </Box>
              ))}
            </RadioGroup>
          </FormControl>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={onConfirm}
              disabled={!selectedReason}
              size="large"
            >
              Confirm and Continue
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default VisitReasonSelect; 