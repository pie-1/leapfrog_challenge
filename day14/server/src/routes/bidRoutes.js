import express from 'express';
import { protect } from '../middleware/auth.js';
import Bid from '../models/Bid.js';
import ServiceProvider from '../models/ServiceProvider.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// Place a bid on a job
router.post('/', protect, async (req, res) => {
  try {
    const { jobId, amount, estimatedTime, message } = req.body;

    // Check if user is a provider
    const provider = await ServiceProvider.findOne({ userId: req.userId });
    if (!provider) {
      return res.status(403).json({ error: 'Only providers can place bids' });
    }

    // Check if bid already exists for this job
    const existingBid = await Bid.findOne({ jobId, providerId: provider._id });
    if (existingBid) {
      return res.status(400).json({ error: 'You already placed a bid on this job' });
    }

    const bid = await Bid.create({
      jobId,
      providerId: provider._id,
      amount,
      estimatedTime,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Bid placed successfully',
      bid,
    });
  } catch (error) {
    console.error('Place bid error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get bids for a job
router.get('/job/:jobId', async (req, res) => {
  try {
    const bids = await Bid.find({ jobId: req.params.jobId })
      .populate('providerId', 'serviceType hourlyRate verified')
      .populate({
        path: 'providerId',
        populate: {
          path: 'userId',
          select: 'name phone',
        },
      })
      .sort({ amount: 1 });
    res.json(bids);
  } catch (error) {
    console.error('Get bids error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Accept a bid
router.put('/:id/accept', protect, async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) {
      return res.status(404).json({ error: 'Bid not found' });
    }

    // Check if user is the job owner
    const job = await Booking.findById(bid.jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.customerId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Only the job owner can accept bids' });
    }

    // Reject all other bids for this job
    await Bid.updateMany(
      { jobId: bid.jobId, _id: { $ne: bid._id } },
      { status: 'rejected' }
    );

    // Accept this bid
    bid.status = 'accepted';
    await bid.save();

    // Update job with provider
    job.providerId = bid.providerId;
    job.status = 'accepted';
    await job.save();

    res.json({
      success: true,
      message: 'Bid accepted successfully',
      bid,
    });
  } catch (error) {
    console.error('Accept bid error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Reject a bid
router.put('/:id/reject', protect, async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) {
      return res.status(404).json({ error: 'Bid not found' });
    }

    const job = await Booking.findById(bid.jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.customerId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Only the job owner can reject bids' });
    }

    bid.status = 'rejected';
    await bid.save();

    res.json({
      success: true,
      message: 'Bid rejected',
      bid,
    });
  } catch (error) {
    console.error('Reject bid error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;