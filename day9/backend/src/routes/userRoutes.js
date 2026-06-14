const express = require('express');
const { saveUser, getUser, updateRole, updateGuideProfile } = require('../controllers/userController');

const router = express.Router();

router.post('/save', saveUser);
router.get('/:uid', getUser);
router.put('/role', updateRole);
router.put('/guide-profile', updateGuideProfile);

module.exports = router;