const Wedding = require('./wedding.model');

const createWedding = async (weddingData) => {
  const wedding = new Wedding(weddingData);
  await wedding.save();
  return wedding;
};

const getWeddingsByUser = async (userId) => {
  return await Wedding.find({ userId }).sort({ date: 1 });
};

const getWeddingById = async (id, userId) => {
  return await Wedding.findOne({ _id: id, userId });
};

const updateWedding = async (id, userId, updateData) => {
  return await Wedding.findOneAndUpdate(
    { _id: id, userId },
    updateData,
    { new: true, runValidators: true }
  );
};

const deleteWedding = async (id, userId) => {
  return await Wedding.findOneAndDelete({ _id: id, userId });
};

module.exports = {
  createWedding,
  getWeddingsByUser,
  getWeddingById,
  updateWedding,
  deleteWedding,
};