const express = require('express');
const router = express.Router();
const vendorController = require('./vendor.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

// Public routes
router.get('/', vendorController.getAllVendors);
router.get('/:id', vendorController.getVendorById);

// Protected routes
router.use(authMiddleware);
router.post('/', vendorController.createVendor);
router.put('/:id', vendorController.updateVendor);
router.delete('/:id', vendorController.deleteVendor);
router.post('/:id/reviews', vendorController.addReview);

module.exports = router;