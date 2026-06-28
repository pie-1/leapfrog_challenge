import { useState } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAIRecommendations } from './hooks/useAIRecommendations';
import PreferencesForm from './components/PreferencesForm';
import BudgetForm from './components/BudgetForm';
import TimelineForm from './components/TimelineForm';
import RecommendationsResult from './components/RecommendationsResult';
import BudgetOptimizationResult from './components/BudgetOptimizationResult';
import TimelineResult from './components/TimelineResult';

export default function AIRecommendations() {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [preferences, setPreferences] = useState({
    budget: '',
    location: '',
    guests: '',
    style: '',
    eventType: '',
    category: 'All',
    weddingDate: ''
  });

  const {
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
  } = useAIRecommendations();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleGetRecommendations = async () => {
    const result = await getRecommendations(preferences);
    if (result) setRecommendations(result);
  };

  const handleOptimizeBudget = async () => {
    const result = await optimizeBudget(preferences);
    if (result) setBudgetOptimization(result);
  };

  const handleGenerateTimeline = async () => {
    const result = await getTimeline(preferences);
    if (result) setTimeline(result);
  };

  if (loading) return <LoadingSpinner message="AI is thinking..." />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-6 py-10"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-gray-800 mb-2">🤖 AI Wedding Assistant</h1>
          <p className="text-gray-500">Powered by Grok AI via OpenRouter</p>
        </div>
        <div className="text-xs bg-gradient-to-r from-rose-500 to-amber-500 text-white px-3 py-1 rounded-full">
          Free AI Mode
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'recommendations'
              ? 'bg-rose-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🌟 Recommendations
        </button>
        <button
          onClick={() => setActiveTab('budget')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'budget'
              ? 'bg-rose-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          💰 Budget Optimizer
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'timeline'
              ? 'bg-rose-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📅 Timeline Generator
        </button>
      </div>

      {/* Content */}
      {activeTab === 'recommendations' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h2 className="font-serif text-lg text-gray-800 mb-4">Wedding Preferences</h2>
            <PreferencesForm
              preferences={preferences}
              onChange={handleChange}
              onGetRecommendations={handleGetRecommendations}
              loading={loading}
            />
          </div>
          <RecommendationsResult recommendations={recommendations} />
        </div>
      )}

      {activeTab === 'budget' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h2 className="font-serif text-lg text-gray-800 mb-4">Budget Details</h2>
            <BudgetForm
              preferences={preferences}
              onChange={handleChange}
              onOptimizeBudget={handleOptimizeBudget}
              loading={loading}
            />
          </div>
          <BudgetOptimizationResult 
            budgetOptimization={budgetOptimization} 
            totalBudget={parseInt(preferences.budget) || 500000}
          />
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h2 className="font-serif text-lg text-gray-800 mb-4">Wedding Date</h2>
            <TimelineForm
              preferences={preferences}
              onChange={handleChange}
              onGenerateTimeline={handleGenerateTimeline}
              loading={loading}
            />
          </div>
          <TimelineResult timeline={timeline} />
        </div>
      )}
    </motion.div>
  );
}