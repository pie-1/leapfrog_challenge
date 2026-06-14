const express = require('express');
const { 
  saveUser, 
  getUser, 
  getAllUsers,
  updateRole, 
  updateGuideProfile,
  updateProfile
} = require('../controllers/userController');

const router = express.Router();

router.post('/save', saveUser);
router.get('/all', getAllUsers);  // ← MOVE THIS ABOVE /:uid
router.get('/:uid', getUser);      // ← This comes AFTER /all
router.put('/role', updateRole);
router.put('/guide-profile', updateGuideProfile);
router.put('/update-profile', updateProfile);

module.exports = router;