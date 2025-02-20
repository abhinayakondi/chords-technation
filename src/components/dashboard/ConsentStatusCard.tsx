import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  LinearProgress,
} from '@mui/material';
import { CheckCircle, Pending, Block } from '@mui/icons-material';

interface ConsentStatus {
  approved: number;
  pending: number;
  revoked: number;
  total: number;
}

interface ConsentStatusCardProps {
  status: ConsentStatus;
}

const ConsentStatusCard: React.FC<ConsentStatusCardProps> = ({ status }) => {
  const { approved, pending, revoked, total } = status;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Consent Status Overview
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <LinearProgress
            variant="determinate"
            value={(approved / total) * 100}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: '#E2E8F0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'success.main',
              },
            }}
          />
        </Box>

        <Stack direction="row" spacing={2} justifyContent="space-around">
          <Box sx={{ textAlign: 'center' }}>
            <Chip
              icon={<CheckCircle />}
              label={`${approved} Approved`}
              color="success"
              sx={{ mb: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              Active Consents
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Chip
              icon={<Pending />}
              label={`${pending} Pending`}
              color="warning"
              sx={{ mb: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              Awaiting Review
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Chip
              icon={<Block />}
              label={`${revoked} Revoked`}
              color="error"
              sx={{ mb: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              Access Denied
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ConsentStatusCard; 