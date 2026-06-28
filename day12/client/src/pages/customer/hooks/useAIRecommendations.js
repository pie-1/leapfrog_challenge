import { useState } from 'react';
import api from '../../../utils/api';

export function useAIRecommendations() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [budgetOptimization, setBudgetOptimization] = useState(null);
  const [timeline, setTimeline] = useState(null);

  const getRecommendations = async (preferences) => {
    setLoading(true);
    try {
      const response = await api.post('/ai/recommendations', preferences);
      setRecommendations(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Failed to get recommendations:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const optimizeBudget = async (preferences) => {
    setLoading(true);
    try {
      const response = await api.post('/ai/optimize-budget', {
        totalBudget: parseInt(preferences.budget) || 500000,
        events: ['Mehendi', 'Sangeet', 'Wedding', 'Reception'],
        guests: parseInt(preferences.guests) || 200,
        location: preferences.location || 'Not specified'
      });
      setBudgetOptimization(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Failed to optimize budget:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getTimeline = async (preferences) => {
    setLoading(true);
    try {
      const response = await api.post('/ai/timeline', {
        weddingDate: preferences.weddingDate || new Date().toISOString().split('T')[0],
        events: ['Mehendi', 'Sangeet', 'Wedding', 'Reception'],
        location: preferences.location || 'Not specified',
        guests: parseInt(preferences.guests) || 200
      });
      setTimeline(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Failed to get timeline:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    recommendations,
    budgetOptimization,
    timeline,
    getRecommendations,
    optimizeBudget,
    getTimeline,
    setRecommendations,
    setBudgetOptimization,
    setTimeline
  };
}