import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Container,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { Patient } from '../../types/doctor';

interface PatientSearchProps {
  onSelectPatient: (patient: Patient) => void;
  onSearch: (query: string) => Promise<Patient[]>;
}

const PatientSearch: React.FC<PatientSearchProps> = ({ onSelectPatient, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const results = await onSearch(searchQuery);
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during search');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setSearchResults([]);
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Patient Search
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Search by name, health card number, or digital health ID
        </Typography>

        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter patient name, health card number, or digital health ID"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={handleSearch} edge="start">
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClear} edge="end">
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {searchResults.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Health Card Number</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Home Province</TableCell>
                  <TableCell>Digital Health ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((patient) => (
                  <TableRow
                    key={patient.id}
                    hover
                    onClick={() => onSelectPatient(patient)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.healthCardNumber}</TableCell>
                    <TableCell>{new Date(patient.dateOfBirth).toLocaleDateString()}</TableCell>
                    <TableCell>{patient.homeProvince}</TableCell>
                    <TableCell>{patient.digitalHealthId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {searchResults.length === 0 && searchQuery && !loading && !error && (
          <Typography variant="body1" color="text.secondary" align="center">
            No patients found matching your search criteria
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default PatientSearch; 