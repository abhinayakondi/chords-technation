import { useState, useEffect } from 'react';
import { mmaApi } from '../services/mmaApi';
import websocketService from '../../../core/websocket/websocketService';
import { FightEvent, FightResult } from '../types';

export const useFight = (fightId: string) => {
  const [fight, setFight] = useState<FightEvent | null>(null);
  const [result, setResult] = useState<FightResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFightData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load both fight details and result in parallel
        const [fightDetails, fightResult] = await Promise.all([
          mmaApi.getFightDetails(fightId),
          mmaApi.getFightResult(fightId)
        ]);

        setFight(fightDetails);
        setResult(fightResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load fight data');
      } finally {
        setLoading(false);
      }
    };

    loadFightData();

    // Subscribe to real-time updates if fight is live
    if (fight?.status === 'live') {
      const unsubscribe = websocketService.subscribeFight(fightId, (updatedResult) => {
        setResult(updatedResult);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [fightId, fight?.status]);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);

      const [fightDetails, fightResult] = await Promise.all([
        mmaApi.getFightDetails(fightId),
        mmaApi.getFightResult(fightId)
      ]);

      setFight(fightDetails);
      setResult(fightResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh fight data');
    } finally {
      setLoading(false);
    }
  };

  return {
    fight,
    result,
    loading,
    error,
    refresh
  };
}; 