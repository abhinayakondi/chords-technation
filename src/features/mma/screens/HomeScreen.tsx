import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Tab,
  Tabs,
  CircularProgress,
} from '@mui/material';
import { LiveFightScore } from '../components/LiveFightScore';
import { LocalEventsList } from '../../local-matches/components/LocalEventsList';
import { MMAApiService } from '../services/mmaApi';
import { FightEvent, LocalEvent } from '../types';
import { WebSocketService } from '../../../core/api/websocket';

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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const HomeScreen: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [upcomingFights, setUpcomingFights] = useState<FightEvent[]>([]);
  const [localEvents, setLocalEvents] = useState<LocalEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mmaApi = MMAApiService.getInstance();
    const wsService = WebSocketService.getInstance();

    const loadData = async () => {
      try {
        const fights = await mmaApi.getUpcomingFights();
        setUpcomingFights(fights);
        
        // TODO: Replace with actual API call when backend is ready
        setLocalEvents([
          {
            id: 'local-1',
            name: 'Montreal Fight Night',
            date: '2024-04-15',
            location: 'Montreal Combat Center',
            status: 'approved',
            fightCard: [
              {
                fighter1: {
                  id: 'f1',
                  name: 'Alex Silva',
                  weightClass: 'Middleweight',
                  record: '10-2',
                },
                fighter2: {
                  id: 'f2',
                  name: 'John Doe',
                  weightClass: 'Middleweight',
                  record: '8-1',
                },
                weightClass: 'Middleweight',
              },
            ],
            ticketUrl: 'https://example.com/tickets',
          },
        ]);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    wsService.connect();
    loadData();

    return () => {
      wsService.disconnect();
    };
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLocalEventClick = (event: LocalEvent) => {
    // TODO: Implement navigation to event details
    console.log('Event clicked:', event);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          MMA Live Scores & Events
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Live Professional Fights" />
            <Tab label="Local Events" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          {upcomingFights.length > 0 ? (
            upcomingFights.map((fight) => (
              <Box key={fight.id} mb={3}>
                <LiveFightScore fightId={fight.id} />
              </Box>
            ))
          ) : (
            <Typography variant="subtitle1" color="textSecondary">
              No live fights at the moment
            </Typography>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {localEvents.length > 0 ? (
            <LocalEventsList
              events={localEvents}
              onEventClick={handleLocalEventClick}
            />
          ) : (
            <Typography variant="subtitle1" color="textSecondary">
              No local events found
            </Typography>
          )}
        </TabPanel>
      </Box>
    </Container>
  );
}; 