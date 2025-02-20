import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Chip,
  Divider,
  Button,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stack,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  LocalHospital,
  Security,
  Assessment,
  MoreVert,
  Delete,
  CheckCircle,
  Warning,
  Info,
} from '@mui/icons-material';
import DashboardLayout from '../../components/layout/DashboardLayout';

interface Notification {
  id: string;
  type: 'emergency' | 'consent' | 'access' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'emergency',
    title: 'Emergency Access Alert',
    message: 'Dr. Sarah Smith accessed your records under emergency protocol.',
    timestamp: '2024-02-20T14:30:00',
    read: false,
    priority: 'high',
  },
  {
    id: '2',
    type: 'consent',
    title: 'New Consent Request',
    message: 'City General Hospital requests access to your medical history.',
    timestamp: '2024-02-20T10:15:00',
    read: false,
    priority: 'medium',
  },
  {
    id: '3',
    type: 'access',
    title: 'Record Access',
    message: 'Your lab results were viewed by Dr. Michael Chen.',
    timestamp: '2024-02-19T16:45:00',
    read: true,
    priority: 'low',
  },
  {
    id: '4',
    type: 'system',
    title: 'System Update',
    message: 'Your privacy settings were updated successfully.',
    timestamp: '2024-02-19T09:30:00',
    read: true,
    priority: 'low',
  },
];

const NotificationItem: React.FC<{
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ notification, onMarkAsRead, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'emergency':
        return <LocalHospital color="error" />;
      case 'consent':
        return <Security color="primary" />;
      case 'access':
        return <Assessment color="info" />;
      default:
        return <Info color="action" />;
    }
  };

  const getPriorityChip = (priority: string) => {
    const config = {
      high: { color: 'error', icon: <Warning fontSize="small" /> },
      medium: { color: 'warning', icon: <Info fontSize="small" /> },
      low: { color: 'success', icon: <CheckCircle fontSize="small" /> },
    };

    const { color, icon } = config[priority as keyof typeof config];
    
    return (
      <Chip
        icon={icon}
        label={priority.toUpperCase()}
        size="small"
        color={color as 'error' | 'warning' | 'success'}
        variant="outlined"
      />
    );
  };

  return (
    <>
      <ListItem
        sx={{
          bgcolor: notification.read ? 'transparent' : 'action.hover',
          '&:hover': { bgcolor: 'action.selected' },
        }}
      >
        <ListItemIcon>{getIcon(notification.type)}</ListItemIcon>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1">{notification.title}</Typography>
              {getPriorityChip(notification.priority)}
            </Box>
          }
          secondary={
            <>
              <Typography variant="body2" color="text.secondary" paragraph>
                {notification.message}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(notification.timestamp).toLocaleString()}
              </Typography>
            </>
          }
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {!notification.read && (
          <MenuItem
            onClick={() => {
              onMarkAsRead(notification.id);
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <CheckCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Mark as read" />
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            onDelete(notification.id);
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </>
  );
};

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <NotificationsIcon sx={{ fontSize: 32, mr: 2 }} />
          <Typography variant="h4" component="h1">
            Notifications
          </Typography>
        </Box>

        <Paper sx={{ mb: 3 }}>
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="filter-label">Filter</InputLabel>
              <Select
                labelId="filter-label"
                value={filter}
                label="Filter"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="all">All Notifications</MenuItem>
                <MenuItem value="unread">Unread</MenuItem>
                <MenuItem value="emergency">Emergency</MenuItem>
                <MenuItem value="consent">Consent</MenuItem>
                <MenuItem value="access">Access</MenuItem>
                <MenuItem value="system">System</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                onClick={handleMarkAllAsRead}
                disabled={!notifications.some(n => !n.read)}
              >
                Mark All as Read
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteAll}
                disabled={notifications.length === 0}
              >
                Clear All
              </Button>
            </Stack>
          </Box>
          <Divider />
          {filteredNotifications.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                No notifications to display
              </Typography>
            </Box>
          ) : (
            <List>
              {filteredNotifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <NotificationItem
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                  {index < filteredNotifications.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </DashboardLayout>
  );
};

export default Notifications; 