import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [scores, setScores] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchScores = useCallback(async (vehicle = null) => {
    try {
      setIsLoading(true);
      const url = vehicle ? `/api/scores?vehicle=${vehicle}` : '/api/scores';
      const response = await axios.get(url);
      setScores(response.data);
      if (response.data.length > 0) {
        setHighScore(response.data[0].score);
      }
    } catch (error) {
      console.error('Error fetching scores:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveScore = useCallback(async (score, vehicle, playerName = 'Anonymous') => {
    try {
      const response = await axios.post('/api/scores', {
        score,
        vehicle,
        playerName
      });
      await fetchScores(vehicle);
      return response.data;
    } catch (error) {
      console.error('Error saving score:', error);
      throw error;
    }
  }, [fetchScores]);

  return (
    <GameContext.Provider value={{
      scores,
      highScore,
      isLoading,
      fetchScores,
      saveScore
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};