const express = require('express');
const { getAllGuides, registerGuide } = require('../controllers/guideController');

const router = express.Router();

router.get('/', getAllGuides);
router.post('/register', registerGuide);

module.exports = router;