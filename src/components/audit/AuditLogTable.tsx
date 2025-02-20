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
  Typography,
} from '@mui/material';
import {
  Visibility,
  Download,
  Warning,
  CheckCircle,
  Error,
  Info,
} from '@mui/icons-material';

interface AuditLog {
  id: string;
  timestamp: string;
  actor: {
    name: string;
    role: string;
    organization: string;
  };
  action: 'view' | 'download' | 'emergency_access' | 'consent_change';
  resourceType: string;
  status: 'success' | 'warning' | 'error';
  details: string;
}

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2024-02-20T14:30:00',
    actor: {
      name: 'Dr. Sarah Smith',
      role: 'Cardiologist',
      organization: 'Heart Care Center',
    },
    action: 'view',
    resourceType: 'Lab Results',
    status: 'success',
    details: 'Viewed cardiac enzyme test results',
  },
  {
    id: '2',
    timestamp: '2024-02-20T12:15:00',
    actor: {
      name: 'Dr. Michael Chen',
      role: 'Neurologist',
      organization: 'City General Hospital',
    },
    action: 'download',
    resourceType: 'MRI Scans',
    status: 'success',
    details: 'Downloaded brain MRI series for analysis',
  },
  {
    id: '3',
    timestamp: '2024-02-19T23:45:00',
    actor: {
      name: 'Dr. James Wilson',
      role: 'Emergency Physician',
      organization: 'Emergency Care Unit',
    },
    action: 'emergency_access',
    resourceType: 'Full Medical History',
    status: 'warning',
    details: 'Emergency access during critical care situation',
  },
  {
    id: '4',
    timestamp: '2024-02-19T15:20:00',
    actor: {
      name: 'System',
      role: 'Automated Process',
      organization: 'CHORDS Platform',
    },
    action: 'consent_change',
    resourceType: 'Consent Settings',
    status: 'error',
    details: 'Failed to update consent settings due to system error',
  },
];

const AuditLogTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getActionIcon = (action: AuditLog['action']) => {
    const actionConfig = {
      view: { icon: Visibility, color: 'primary' },
      download: { icon: Download, color: 'secondary' },
      emergency_access: { icon: Warning, color: 'warning' },
      consent_change: { icon: Info, color: 'info' },
    };

    const { icon: Icon, color } = actionConfig[action];
    return <Icon color={color as 'primary' | 'secondary' | 'warning' | 'info'} />;
  };

  const getStatusIcon = (status: AuditLog['status']) => {
    const statusConfig = {
      success: { icon: CheckCircle, color: 'success' },
      warning: { icon: Warning, color: 'warning' },
      error: { icon: Error, color: 'error' },
    };

    const { icon: Icon, color } = statusConfig[status];
    return <Icon color={color as 'success' | 'warning' | 'error'} />;
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Actor</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Resource</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Details</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockAuditLogs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((log) => (
                <TableRow key={log.id} hover>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(log.timestamp).toLocaleDateString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {log.actor.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {log.actor.role}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {log.actor.organization}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getActionIcon(log.action)}
                      <Typography variant="body2">
                        {log.action.replace('_', ' ').toUpperCase()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={log.resourceType}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title={log.status.toUpperCase()}>
                      <Box>{getStatusIcon(log.status)}</Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{log.details}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Details">
                      <IconButton size="small">
                        <Info fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={mockAuditLogs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AuditLogTable; 