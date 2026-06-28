const vendorService = require('./vendor.service');

const createVendor = async (req, res, next) => {
  try {
    // Check if vendor already exists for this user
    const existingVendor = await vendorService.getVendorByUserId(req.user.uid);
    if (existingVendor) {
      return res.status(400).json({ 
        message: 'You already have a vendor profile' 
      });
    }

    const vendorData = { ...req.body, userId: req.user.uid };
    const vendor = await vendorService.createVendor(vendorData);
    res.status(201).json({
      success: true,
      data: vendor,
      message: 'Vendor registered successfully!'
    });
  } catch (error) {
    next(error);
  }
};

const getAllVendors = async (req, res, next) => {
  try {
    const { category, city, search, minPrice, maxPrice, verified } = req.query;
    
    const filters = {
      category,
      city,
      search,
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      verified: verified === 'true' ? true : undefined,
    };

    const vendors = await vendorService.getAllVendors(filters);
    res.json({
      success: true,
      count: vendors.length,
      data: vendors
    });
  } catch (error) {
    next(error);
  }
};

const getVendorById = async (req, res, next) => {
  try {
    const vendor = await vendorService.getVendorById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.json({
      success: true,
      data: vendor
    });
  } catch (error) {
    next(error);
  }
};

const updateVendor = async (req, res, next) => {
  try {
    const vendor = await vendorService.getVendorById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // Check if user owns this vendor profile
    if (vendor.userId !== req.user.uid) {
      return res.status(403).json({ message: 'Unauthorized to update this vendor' });
    }

    const updatedVendor = await vendorService.updateVendor(req.params.id, req.body);
    res.json({
      success: true,
      data: updatedVendor,
      message: 'Vendor updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

const deleteVendor = async (req, res, next) => {
  try {
    const vendor = await vendorService.getVendorById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // Check if user owns this vendor profile
    if (vendor.userId !== req.user.uid) {
      return res.status(403).json({ message: 'Unauthorized to delete this vendor' });
    }

    await vendorService.deleteVendor(req.params.id);
    res.json({
      success: true,
      message: 'Vendor deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

const addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const reviewData = {
      userId: req.user.uid,
      userName: req.user.name || 'Anonymous',
      rating,
      comment,
      date: new Date()
    };

    const vendor = await vendorService.addReview(req.params.id, reviewData);
    res.json({
      success: true,
      data: vendor,
      message: 'Review added successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
  addReview
};