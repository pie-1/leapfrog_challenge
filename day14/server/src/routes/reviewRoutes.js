import express from 'express';
import { protect } from '../middleware/auth.js';
import Review from '../models/Review.js';
import Booking from '../models/Booking.js';
import ServiceProvider from '../models/ServiceProvider.js';

const router = express.Router();

// Create a review
router.post('/', protect, async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    // Check if booking exists and belongs to user
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.customerId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Only the customer can review this booking' });
    }

    if (booking.status !== 'completed') {
      return res.status(400).json({ error: 'Booking must be completed to review' });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ bookingId });
    if (existingReview) {
      return res.status(400).json({ error: 'You already reviewed this booking' });
    }

    const review = await Review.create({
      bookingId,
      customerId: req.userId,
      providerId: booking.providerId,
      rating,
      comment,
    });

    // Update provider rating
    const provider = await ServiceProvider.findById(booking.providerId);
    if (provider) {
      const allReviews = await Review.find({ providerId: provider._id });
      const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
      provider.rating = parseFloat(avgRating.toFixed(1));
      provider.totalReviews = allReviews.length;
      await provider.save();
    }

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      review,
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get reviews for a provider
router.get('/provider/:providerId', async (req, res) => {
  try {
    const reviews = await Review.find({ providerId: req.params.providerId })
      .populate('customerId', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get review by booking ID
router.get('/booking/:bookingId', protect, async (req, res) => {
  try {
    const review = await Review.findOne({ bookingId: req.params.bookingId })
      .populate('customerId', 'name')
      .populate('providerId', 'serviceType');
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    console.error('Get review by booking error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a review (admin only or owner)
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Check if user is the customer who wrote the review
    if (review.customerId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this review' });
    }

    await Review.findByIdAndDelete(req.params.id);

    // Update provider rating
    const provider = await ServiceProvider.findById(review.providerId);
    if (provider) {
      const allReviews = await Review.find({ providerId: provider._id });
      if (allReviews.length > 0) {
        const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
        provider.rating = parseFloat(avgRating.toFixed(1));
        provider.totalReviews = allReviews.length;
      } else {
        provider.rating = 0;
        provider.totalReviews = 0;
      }
      await provider.save();
    }

    res.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;