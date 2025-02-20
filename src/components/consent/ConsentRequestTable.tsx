import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel,
  Typography,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  AccessTime,
  Info,
  CalendarToday,
} from '@mui/icons-material';

interface ConsentRequest {
  id: string;
  providerName: string;
  specialization: string;
  requestDate: string;
  expiryDate: string | null;
  status: 'approved' | 'pending' | 'revoked';
  dataTypes: string[];
  purpose: string;
}

const mockRequests: ConsentRequest[] = [
  {
    id: '1',
    providerName: 'Dr. Sarah Smith',
    specialization: 'Cardiologist',
    requestDate: '2024-02-15',
    expiryDate: '2024-08-15',
    status: 'approved',
    dataTypes: ['Lab Results', 'Medications', 'Vital Signs'],
    purpose: 'Ongoing cardiac treatment',
  },
  {
    id: '2',
    providerName: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    requestDate: '2024-02-18',
    expiryDate: null,
    status: 'pending',
    dataTypes: ['MRI Scans', 'Clinical Notes'],
    purpose: 'Initial consultation',
  },
  {
    id: '3',
    providerName: 'Dr. Emily Brown',
    specialization: 'Primary Care',
    requestDate: '2024-01-20',
    expiryDate: '2024-07-20',
    status: 'revoked',
    dataTypes: ['Full Medical History'],
    purpose: 'Annual checkup',
  },
];

const ConsentRequestTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusChip = (status: ConsentRequest['status']) => {
    const statusConfig = {
      approved: { icon: CheckCircle, color: 'success', label: 'Approved' },
      pending: { icon: AccessTime, color: 'warning', label: 'Pending' },
      revoked: { icon: Cancel, color: 'error', label: 'Revoked' },
    };

    const { icon: Icon, color, label } = statusConfig[status];
    return (
      <Chip
        icon={<Icon />}
        label={label}
        color={color as 'success' | 'warning' | 'error'}
        size="small"
      />
    );
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Healthcare Provider</TableCell>
              <TableCell>Purpose</TableCell>
              <TableCell>Data Types</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Dates</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockRequests
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((request) => (
                <TableRow key={request.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {request.providerName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {request.specialization}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{request.purpose}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {request.dataTypes.map((type) => (
                        <Chip
                          key={type}
                          label={type}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>{getStatusChip(request.status)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarToday fontSize="small" color="action" />
                        <Typography variant="caption">
                          Requested: {new Date(request.requestDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                      {request.expiryDate && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTime fontSize="small" color="action" />
                          <Typography variant="caption">
                            Expires: {new Date(request.expiryDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Tooltip title="Toggle Access">
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              checked={request.status === 'approved'}
                              onChange={() => {}}
                            />
                          }
                          label=""
                        />
                      </Tooltip>
                      <Tooltip title="View Details">
                        <IconButton size="small">
                          <Info fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={mockRequests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ConsentRequestTable; 