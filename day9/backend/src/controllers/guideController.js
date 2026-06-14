const User = require('../models/User');

// Get all guides (users with role 'guide')
const getAllGuides = async (req, res) => {
  try {
    const guides = await User.find({ 
      role: 'guide',
      'guideProfile.verified': true 
    }).select('-uid -email'); // Hide sensitive info
    
    res.json(guides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register as guide (now handled by userController)
const registerGuide = async (req, res) => {
  try {
    const { uid, name, email, phone, experience, languages, region, pricePerDay } = req.body;
    
    const user = await User.findOneAndUpdate(
      { uid },
      { 
        role: 'guide',
        name,
        email,
        phone,
        guideProfile: {
          experience,
          languages,
          region,
          pricePerDay,
          verified: false,
          rating: 0
        }
      },
      { new: true, upsert: true }
    );
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllGuides, registerGuide };