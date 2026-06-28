const Vendor = require('./vendor.model');

const createVendor = async (vendorData) => {
  const vendor = new Vendor(vendorData);
  await vendor.save();
  return vendor;
};

const getVendorById = async (id) => {
  return await Vendor.findById(id);
};

const getVendorByUserId = async (userId) => {
  return await Vendor.findOne({ userId });
};

const getAllVendors = async (filters = {}) => {
  const query = {};
  
  if (filters.category) query.category = filters.category;
  if (filters.city) query.city = filters.city;
  if (filters.verified !== undefined) query.verified = filters.verified;
  if (filters.available !== undefined) query.available = filters.available;
  if (filters.minPrice) query['pricing.startingPrice'] = { $gte: filters.minPrice };
  if (filters.maxPrice) query['pricing.startingPrice'] = { $lte: filters.maxPrice };
  
  // Search by text
  if (filters.search) {
    query.$or = [
      { businessName: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } }
    ];
  }
  
  return await Vendor.find(query).sort({ rating: -1 });
};

const updateVendor = async (id, updateData) => {
  return await Vendor.findByIdAndUpdate(
    id,
    { ...updateData, updatedAt: new Date() },
    { new: true, runValidators: true }
  );
};

const deleteVendor = async (id) => {
  return await Vendor.findByIdAndDelete(id);
};

const addReview = async (vendorId, reviewData) => {
  const vendor = await Vendor.findById(vendorId);
  vendor.reviews = vendor.reviews || [];
  vendor.reviews.push(reviewData);
  
  // Update average rating
  const total = vendor.reviews.reduce((sum, r) => sum + r.rating, 0);
  vendor.rating = total / vendor.reviews.length;
  vendor.totalReviews = vendor.reviews.length;
  
  await vendor.save();
  return vendor;
};

module.exports = {
  createVendor,
  getVendorById,
  getVendorByUserId,
  getAllVendors,
  updateVendor,
  deleteVendor,
  addReview,
};