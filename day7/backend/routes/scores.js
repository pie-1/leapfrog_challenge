const express = require('express');
const Score = require('../models/Score');
const router = express.Router();

// post new score
router.post('/', async (req, res) => {
    try{
        const {playerName, score} = req.body;
        const newScore = await Score.create({playerName, score});
        res.status(201).json(newScore);
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

// get scores
router.get('/',async(req,res) => {
    try{
        const scores  = await Score.find().sort({score: -1}).limit(10);
        res.json(scores);
    } catch(error){
        res.status(500).json({message: error.message});
    }
})

module.exports = router;