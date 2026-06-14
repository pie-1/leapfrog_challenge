const User = require('../models/User');

// Save or update user after Firebase login
const saveUser = async (req, res) => {
  try {
    const { uid, email, name, role } = req.body;
    
    let user = await User.findOne({ uid });
    
    if (user) {
      // Update existing user
      user.name = name;
      user.role = role || user.role;
      await user.save();
    } else {
      // Create new user
      user = new User({ uid, email, name, role: role || 'traveller' });
      await user.save();
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by UID
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user role
const updateRole = async (req, res) => {
  try {
    const { uid, role } = req.body;
    const user = await User.findOneAndUpdate(
      { uid },
      { role },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update guide profile
const updateGuideProfile = async (req, res) => {
  try {
    const { 
      uid, experience, pricePerDay, languages, specialties, 
      pastPlaces, certification, bio, phone, location 
    } = req.body;
    
    console.log("Received guide data:", req.body); // Debug log
    
    const user = await User.findOneAndUpdate(
      { uid },
      { 
        role: 'guide',
        phone: phone || '',
        location: location || '',
        bio: bio || '',
        'guideProfile.experience': Number(experience) || 0,
        'guideProfile.pricePerDay': Number(pricePerDay) || 0,
        'guideProfile.languages': languages || [],
        'guideProfile.specialties': specialties || [],
        'guideProfile.pastPlaces': pastPlaces || [],
        'guideProfile.certification': certification || [],
        'guideProfile.verified': true,  // Auto-verify for now
        'guideProfile.rating': 0,
        'guideProfile.totalReviews': 0,
        'guideProfile.availability': true
      },
      { new: true, upsert: true }
    );
    
    console.log("Updated user:", user);
    res.json(user);
  } catch (error) {
    console.error('Guide profile update error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { saveUser, getUser, updateRole, updateGuideProfile };