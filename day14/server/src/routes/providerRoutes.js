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
      ];
    }

    const providers = await ServiceProvider.find(filter).populate('userId', 'name email phone rating');
    res.json(providers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get provider by ID
router.get('/:id', async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id).populate('userId', 'name email phone');
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    res.json(provider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register as provider
router.post('/register', protect, async (req, res) => {
  try {
    const { serviceType, experience, description, hourlyRate, documents } = req.body;

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
      experience,
      description,
      hourlyRate,
      documents,
    });

    res.status(201).json({
      success: true,
      message: 'Provider registered successfully',
      provider,
    });
  } catch (error) {
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
    res.status(500).json({ error: error.message });
  }
});

export default router;