import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Chip,
} from '@mui/material';
import {
  Search,
  FilterList,
  Sort,
  FileUpload,
} from '@mui/icons-material';
import DashboardLayout from '../../components/layout/DashboardLayout';
import HealthRecordCard from '../../components/health/HealthRecordCard';

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

// Mock data
const mockHealthRecords: HealthRecord[] = [
  {
    id: '1',
    type: 'lab_result',
    title: 'Complete Blood Count (CBC)',
    date: '2024-02-15',
    provider: {
      name: 'Dr. Sarah Smith',
      organization: 'City General Hospital',
    },
    status: 'final',
    category: 'Hematology',
    description: 'Routine blood work including RBC, WBC, and platelet counts.',
  },
  {
    id: '2',
    type: 'imaging',
    title: 'Chest X-Ray',
    date: '2024-02-10',
    provider: {
      name: 'Dr. Michael Chen',
      organization: 'Radiology Partners',
    },
    status: 'final',
    category: 'Radiology',
    description: 'Routine chest X-ray examination, frontal and lateral views.',
  },
  {
    id: '3',
    type: 'prescription',
    title: 'Lisinopril 10mg',
    date: '2024-02-01',
    provider: {
      name: 'Dr. Emily Brown',
      organization: 'Heart Care Center',
    },
    status: 'active',
    category: 'Medication',
    description: 'Take 1 tablet by mouth daily for blood pressure.',
  },
  {
    id: '4',
    type: 'clinical_note',
    title: 'Annual Physical Examination',
    date: '2024-01-20',
    provider: {
      name: 'Dr. James Wilson',
      organization: 'Primary Care Associates',
    },
    status: 'final',
    category: 'General',
    description: 'Routine annual physical examination with preventive care review.',
  },
];

const HealthRecords: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recordType, setRecordType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleViewRecord = (record: HealthRecord) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  const handleDownloadRecord = (record: HealthRecord) => {
    console.log('Downloading record:', record.id);
    // Implement download logic
  };

  const handleShareRecord = (record: HealthRecord) => {
    console.log('Sharing record:', record.id);
    // Implement share logic
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Health Records
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and manage your medical records, test results, and prescriptions.
          </Typography>
        </Box>

        {/* Controls */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mb: 4 }}
          alignItems="center"
        >
          <TextField
            fullWidth
            placeholder="Search records"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="record-type-label">Record Type</InputLabel>
            <Select
              labelId="record-type-label"
              value={recordType}
              label="Record Type"
              onChange={(e) => setRecordType(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <FilterList />
                </InputAdornment>
              }
            >
              <MenuItem value="all">All Records</MenuItem>
              <MenuItem value="lab_result">Lab Results</MenuItem>
              <MenuItem value="imaging">Imaging</MenuItem>
              <MenuItem value="prescription">Prescriptions</MenuItem>
              <MenuItem value="clinical_note">Clinical Notes</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Sort />
                </InputAdornment>
              }
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="type">Type</MenuItem>
              <MenuItem value="provider">Provider</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<FileUpload />}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Upload Record
          </Button>
        </Stack>

        {/* Records Grid */}
        <Grid container spacing={3}>
          {mockHealthRecords.map((record) => (
            <Grid item xs={12} md={6} key={record.id}>
              <HealthRecordCard
                record={record}
                onView={handleViewRecord}
                onDownload={handleDownloadRecord}
                onShare={handleShareRecord}
              />
            </Grid>
          ))}
        </Grid>

        {/* View Record Dialog */}
        <Dialog
          open={isViewDialogOpen}
          onClose={() => setIsViewDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          {selectedRecord && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {selectedRecord.title}
                  <Chip
                    label={selectedRecord.status}
                    size="small"
                    color={selectedRecord.status === 'final' ? 'success' : 'warning'}
                  />
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                <Typography variant="body1" paragraph>
                  {selectedRecord.description}
                </Typography>
                <Stack spacing={2}>
                  <Typography variant="body2" color="text.secondary">
                    Date: {new Date(selectedRecord.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Provider: {selectedRecord.provider.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Organization: {selectedRecord.provider.organization}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {selectedRecord.category}
                  </Typography>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
                <Button
                  variant="contained"
                  onClick={() => handleDownloadRecord(selectedRecord)}
                >
                  Download
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </DashboardLayout>
  );
};

export default HealthRecords;

 