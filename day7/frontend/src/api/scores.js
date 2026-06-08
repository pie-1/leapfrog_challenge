
import axios from "axios";

const API = "http://localhost:5000/api/scores";

// Save score
export const saveScore = (data) => {
  return axios.post(API, data);
};

// Get leaderboard
export const getScores = () => {
  return axios.get(API);
};