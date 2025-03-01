import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, LinearProgress } from '@mui/material';
import { FightResult, FightEvent } from '../types';
import { MMAApiService } from '../services/mmaApi';
import { WebSocketService } from '../../../core/api/websocket';

interface LiveFightScoreProps {
  fightId: string;
}

export const LiveFightScore: React.FC<LiveFightScoreProps> = ({ fightId }) => {
  const [fightDetails, setFightDetails] = useState<FightEvent | null>(null);
  const [liveScore, setLiveScore] = useState<FightResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mmaApi = MMAApiService.getInstance();
    const wsService = WebSocketService.getInstance();

    const loadFightData = async () => {
      try {
        const [details, score] = await Promise.all([
          mmaApi.getFightDetails(fightId),
          mmaApi.getLiveFightScore(fightId)
        ]);
        setFightDetails(details);
        setLiveScore(score);
      } catch (error) {
        console.error('Error loading fight data:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleFightUpdate = (data: FightResult) => {
      setLiveScore(data);
    };

    loadFightData();
    wsService.subscribeFight(fightId, handleFightUpdate);

    return () => {
      wsService.unsubscribeFight(fightId, handleFightUpdate);
    };
  }, [fightId]);

  if (loading) {
    return <LinearProgress />;
  }

  if (!fightDetails || !liveScore) {
    return (
      <Typography color="error">
        Unable to load fight data
      </Typography>
    );
  }

  const currentRound = liveScore.rounds[liveScore.rounds.length - 1];

  return (
    <Card>
      <CardContent>
        <Box mb={2}>
          <Typography variant="h5" gutterBottom>
            {fightDetails.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {fightDetails.venue}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Typography variant="h6">
              {fightDetails.fighters[0].name}
            </Typography>
            <Typography color="textSecondary">
              {fightDetails.fighters[0].record}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="h6" align="center">
              VS
            </Typography>
          </Grid>

          <Grid item xs={5}>
            <Typography variant="h6" align="right">
              {fightDetails.fighters[1].name}
            </Typography>
            <Typography color="textSecondary" align="right">
              {fightDetails.fighters[1].record}
            </Typography>
          </Grid>
        </Grid>

        {currentRound && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Round {currentRound.round}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>
                  Significant Strikes: {currentRound.significantStrikes}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  Takedowns: {currentRound.takedowns}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        {liveScore.result && (
          <Box mt={2} textAlign="center">
            <Typography variant="h6" color="primary">
              {liveScore.result}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}; 