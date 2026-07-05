import express from 'express';
import Booking from '../models/Booking.js';
import ServiceProvider from '../models/ServiceProvider.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Create booking (Post a job)
router.post('/', protect, async (req, res) => {
  try {
    const { 
      serviceType, 
      date, 
      time, 
      address, 
      description, 
      totalAmount,
      providerId 
    } = req.body;

    console.log('📝 Booking request body:', req.body);
    console.log('👤 User ID:', req.userId);

    // Validate required fields
    if (!serviceType || !date || !time || !address) {
      return res.status(400).json({ 
        error: 'Missing required fields: serviceType, date, time, and address are required' 
      });
    }

    // Create booking
    const bookingData = {
      customerId: req.userId,
      serviceType,
      date: new Date(date),
      time,
      address,
      description: description || '',
      totalAmount: totalAmount || 0,
      status: 'pending',
    };

    // Only add providerId if provided and not 'pending'
    if (providerId && providerId !== 'pending' && providerId !== 'null') {
      bookingData.providerId = providerId;
    }

    const booking = new Booking(bookingData);
    await booking.save();

    console.log('✅ Booking created:', booking._id);

    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      booking,
    });
  } catch (error) {
    console.error('❌ Booking creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get my bookings (customer)
router.get('/my-bookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.userId })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
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
    console.error('Error fetching provider bookings:', error);
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
    const isCustomer = booking.customerId.toString() === req.userId;
    const isProvider = provider && booking.providerId && booking.providerId.toString() === provider._id.toString();

    if (!isCustomer && !isProvider) {
      return res.status(403).json({ error: 'Not authorized to update this booking' });
    }

    booking.status = status;
    await booking.save();

    res.json({
      success: true,
      message: 'Booking status updated',
      booking,
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get booking by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customerId', 'name phone')
      .populate('providerId', 'serviceType hourlyRate');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;