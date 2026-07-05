import express from 'express';
import Booking from '../models/Booking.js';
import ServiceProvider from '../models/ServiceProvider.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Create booking
router.post('/', protect, async (req, res) => {
  try {
    const { providerId, serviceType, date, time, address } = req.body;

    const booking = await Booking.create({
      customerId: req.userId,
      providerId,
      serviceType,
      date,
      time,
      address,
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get my bookings (customer)
router.get('/my-bookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.userId })
      .populate('providerId', 'serviceType hourlyRate')
      .populate('customerId', 'name phone')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get provider bookings
router.get('/provider-bookings', protect, async (req, res) => {
  try {
    const provider = await ServiceProvider.findOne({ userId: req.userId });
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    const bookings = await Booking.find({ providerId: provider._id })
      .populate('customerId', 'name phone')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update booking status
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if user is customer or provider
    const provider = await ServiceProvider.findOne({ userId: req.userId });
    if (booking.customerId.toString() !== req.userId && 
        (!provider || booking.providerId.toString() !== provider._id.toString())) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    booking.status = status;
    await booking.save();

    res.json({
      success: true,
      message: 'Booking status updated',
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;