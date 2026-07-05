import express from 'express';
import ServiceProvider from '../models/ServiceProvider.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all providers (with filters)
router.get('/', async (req, res) => {
  try {
    const { category, search, lat, lng } = req.query;
    let filter = {};

    if (category) {
      filter.serviceType = category;
    }

    if (search) {
      filter.$or = [
        { 'serviceType': { $regex: search, $options: 'i' } },
        { 'specialization': { $regex: search, $options: 'i' } },
      ];
    }

    const providers = await ServiceProvider.find(filter)
      .populate('userId', 'name email phone address');
    res.json(providers);
  } catch (error) {
    console.error('Get providers error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get provider by ID
router.get('/:id', async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id)
      .populate('userId', 'name email phone address');
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    res.json(provider);
  } catch (error) {
    console.error('Get provider error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Register as provider
router.post('/register', protect, async (req, res) => {
  try {
    const { 
      serviceType, 
      specialization, 
      experience, 
      description, 
      about,
      hourlyRate, 
      tools, 
      certifications,
      availability,
      location,
    } = req.body;

    // Check if user already has a provider profile
    const existing = await ServiceProvider.findOne({ userId: req.userId });
    if (existing) {
      return res.status(400).json({ error: 'User already registered as provider' });
    }

    // Update user role
    await User.findByIdAndUpdate(req.userId, { role: 'provider' });

    // Create provider profile
    const provider = await ServiceProvider.create({
      userId: req.userId,
      serviceType,
      specialization: specialization || '',
      experience: parseInt(experience) || 0,
      description: description || '',
      about: about || '',
      hourlyRate: parseInt(hourlyRate) || 0,
      tools: tools || [],
      certifications: certifications || [],
      availability: availability || {
        monday: { start: '09:00', end: '17:00' },
        tuesday: { start: '09:00', end: '17:00' },
        wednesday: { start: '09:00', end: '17:00' },
        thursday: { start: '09:00', end: '17:00' },
        friday: { start: '09:00', end: '17:00' },
        saturday: { start: '09:00', end: '17:00' },
        sunday: { start: '09:00', end: '17:00' },
      },
      location: location || {},
    });

    res.status(201).json({
      success: true,
      message: 'Provider registered successfully',
      provider,
    });
  } catch (error) {
    console.error('Provider registration error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update provider profile
router.put('/:id', protect, async (req, res) => {
  try {
    const provider = await ServiceProvider.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    res.json(provider);
  } catch (error) {
    console.error('Update provider error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;