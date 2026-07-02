import Score from '../models/Score.js';

// @desc    Get top scores
// @route   GET /api/scores
export const getScores = async (req, res) => {
  try {
    const { limit = 10, vehicle } = req.query;
    const filter = vehicle ? { vehicle } : {};
    
    const scores = await Score.find(filter)
      .sort({ score: -1 })
      .limit(parseInt(limit));
      
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save new score
// @route   POST /api/scores
export const saveScore = async (req, res) => {
  try {
    const { score, vehicle, playerName } = req.body;
    
    const newScore = await Score.create({
      score,
      vehicle,
      playerName: playerName || 'Anonymous'
    });
    
    res.status(201).json(newScore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete all scores (dev only)
// @route   DELETE /api/scores
export const deleteAllScores = async (req, res) => {
  try {
    await Score.deleteMany({});
    res.json({ message: 'All scores deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};