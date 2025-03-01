import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import { LocalEvent } from '../../mma/types';

interface LocalEventsListProps {
  events: LocalEvent[];
  onEventClick?: (event: LocalEvent) => void;
}

const getStatusColor = (status: LocalEvent['status']) => {
  switch (status) {
    case 'approved':
      return 'success';
    case 'pending':
      return 'warning';
    case 'rejected':
      return 'error';
    default:
      return 'default';
  }
};

export const LocalEventsList: React.FC<LocalEventsListProps> = ({
  events,
  onEventClick,
}) => {
  return (
    <Stack spacing={2}>
      {events.map((event) => (
        <Card key={event.id}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">{event.name}</Typography>
              <Chip
                label={event.status.toUpperCase()}
                color={getStatusColor(event.status)}
                size="small"
              />
            </Box>

            <Typography color="textSecondary" gutterBottom>
              {new Date(event.date).toLocaleDateString()} at {event.location}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Fight Card:
            </Typography>

            <Grid container spacing={2}>
              {event.fightCard.map((fight, index) => (
                <Grid item xs={12} key={index}>
                  <Box
                    p={1}
                    bgcolor="background.paper"
                    borderRadius={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography>
                        {fight.fighter1.name} vs {fight.fighter2.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {fight.weightClass}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box mt={2} display="flex" justifyContent="space-between">
              {event.ticketUrl && (
                <Button
                  variant="contained"
                  color="primary"
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy Tickets
                </Button>
              )}
              <Button
                variant="outlined"
                onClick={() => onEventClick?.(event)}
              >
                View Details
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}; 