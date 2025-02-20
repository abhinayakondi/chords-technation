import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Stack,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Search,
  FileDownload,
  Visibility,
  Warning,
  Download,
  Settings,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import DashboardLayout from '../../components/layout/DashboardLayout';
import AuditLogTable from '../../components/audit/AuditLogTable';

interface ActivitySummary {
  icon: React.ElementType;
  label: string;
  count: number;
  change: number;
}

const activitySummary: ActivitySummary[] = [
  {
    icon: Visibility,
    label: 'Record Views',
    count: 145,
    change: 12,
  },
  {
    icon: Download,
    label: 'Downloads',
    count: 48,
    change: -3,
  },
  {
    icon: Warning,
    label: 'Emergency Access',
    count: 2,
    change: 1,
  },
  {
    icon: Settings,
    label: 'Setting Changes',
    count: 23,
    change: 5,
  },
];

const AuditLogs: React.FC = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Audit Logs
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and monitor all access to your health records. Review who accessed your information and when.
          </Typography>
        </Box>

        {/* Activity Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {activitySummary.map((activity) => (
            <Grid item xs={12} sm={6} md={3} key={activity.label}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <activity.icon
                      sx={{ fontSize: 24, color: 'primary.main', mr: 1 }}
                    />
                    <Typography variant="h6" component="div">
                      {activity.label}
                    </Typography>
                  </Box>
                  <Typography variant="h4" component="div" gutterBottom>
                    {activity.count}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={activity.change >= 0 ? 'success.main' : 'error.main'}
                  >
                    {activity.change >= 0 ? '+' : ''}{activity.change}% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Filters and Controls */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems="center"
          >
            <TextField
              fullWidth
              placeholder="Search by name, action, or resource"
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
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              sx={{ width: { xs: '100%', sm: 200 } }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              sx={{ width: { xs: '100%', sm: 200 } }}
            />
            <Button
              variant="outlined"
              startIcon={<FileDownload />}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Export Logs
            </Button>
          </Stack>
        </Paper>

        {/* Audit Log Table */}
        <AuditLogTable />
      </Container>
    </DashboardLayout>
  );
};

export default AuditLogs; 