import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import {
  Visibility,
  Download,
  Share,
} from '@mui/icons-material';

interface HealthRecord {
  id: string;
  type: 'lab_result' | 'imaging' | 'prescription' | 'clinical_note';
  title: string;
  date: string;
  provider: {
    name: string;
    organization: string;
  };
  status: 'final' | 'preliminary' | 'amended' | 'active';
  category: string;
  description: string;
}

interface HealthRecordCardProps {
  record: HealthRecord;
  onView: (record: HealthRecord) => void;
  onDownload: (record: HealthRecord) => void;
  onShare: (record: HealthRecord) => void;
}

const HealthRecordCard: React.FC<HealthRecordCardProps> = ({
  record,
  onView,
  onDownload,
  onShare,
}) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="div" gutterBottom>
            {record.title}
          </Typography>
          <Chip
            label={record.status}
            size="small"
            color={record.status === 'final' ? 'success' : 'warning'}
          />
        </Box>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            Date: {new Date(record.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Provider: {record.provider.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Organization: {record.provider.organization}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {record.category}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          startIcon={<Visibility />}
          onClick={() => onView(record)}
        >
          View
        </Button>
        <Button
          size="small"
          startIcon={<Download />}
          onClick={() => onDownload(record)}
        >
          Download
        </Button>
        <Button
          size="small"
          startIcon={<Share />}
          onClick={() => onShare(record)}
        >
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

export default HealthRecordCard; 