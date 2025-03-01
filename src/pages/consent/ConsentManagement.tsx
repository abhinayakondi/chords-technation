import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  SelectChangeEvent,
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ConsentRequestTable from '../../components/consent/ConsentRequestTable';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`consent-tabpanel-${index}`}
      aria-labelledby={`consent-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const ConsentManagement: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setFilterType(value);
    if (value !== 'all' && !activeFilters.includes(value)) {
      setActiveFilters([...activeFilters, value]);
    }
  };

  const handleRemoveFilter = (filterToRemove: string) => {
    setActiveFilters(activeFilters.filter(filter => filter !== filterToRemove));
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Consent Management
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage and monitor access to your health records. Review, approve, or revoke consent for healthcare providers.
        </Typography>

        {/* Search and Filter Section */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              placeholder="Search by provider name or specialization"
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
              <InputLabel id="filter-type-label">Filter By</InputLabel>
              <Select
                labelId="filter-type-label"
                value={filterType}
                label="Filter By"
                onChange={handleFilterChange}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterList />
                  </InputAdornment>
                }
              >
                <MenuItem value="all">All Requests</MenuItem>
                <MenuItem value="lab_results">Lab Results</MenuItem>
                <MenuItem value="medications">Medications</MenuItem>
                <MenuItem value="imaging">Imaging</MenuItem>
                <MenuItem value="clinical_notes">Clinical Notes</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {activeFilters.map((filter) => (
                <Chip
                  key={filter}
                  label={filter.replace('_', ' ')}
                  onDelete={() => handleRemoveFilter(filter)}
                  size="small"
                />
              ))}
            </Box>
          )}
        </Paper>

        {/* Tabs and Table */}
        <Paper sx={{ width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="consent request tabs"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="All Requests" />
            <Tab label="Pending" />
            <Tab label="Approved" />
            <Tab label="Revoked" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <ConsentRequestTable />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ConsentRequestTable />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <ConsentRequestTable />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <ConsentRequestTable />
          </TabPanel>
        </Paper>
      </Container>
    </DashboardLayout>
  );
};

export default ConsentManagement; 