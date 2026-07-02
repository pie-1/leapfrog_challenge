import express from 'express';
import { getScores, saveScore, deleteAllScores } from '../controllers/scoreController.js';

const router = express.Router();

router.route('/')
  .get(getScores)
  .post(saveScore)
  .delete(deleteAllScores);

export default router;