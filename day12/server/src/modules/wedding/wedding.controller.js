const weddingService = require('./wedding.service');

const createWedding = async (req, res, next) => {
  try {
    const weddingData = { ...req.body, userId: req.user.uid };
    const wedding = await weddingService.createWedding(weddingData);
    res.status(201).json(wedding);
  } catch (error) {
    next(error);
  }
};

const getWeddings = async (req, res, next) => {
  try {
    const weddings = await weddingService.getWeddingsByUser(req.user.uid);
    res.json(weddings);
  } catch (error) {
    next(error);
  }
};

const getWeddingById = async (req, res, next) => {
  try {
    const wedding = await weddingService.getWeddingById(req.params.id, req.user.uid);
    if (!wedding) {
      return res.status(404).json({ message: 'Wedding not found' });
    }
    res.json(wedding);
  } catch (error) {
    next(error);
  }
};

const updateWedding = async (req, res, next) => {
  try {
    const wedding = await weddingService.updateWedding(req.params.id, req.user.uid, req.body);
    if (!wedding) {
      return res.status(404).json({ message: 'Wedding not found' });
    }
    res.json(wedding);
  } catch (error) {
    next(error);
  }
};

const deleteWedding = async (req, res, next) => {
  try {
    const wedding = await weddingService.deleteWedding(req.params.id, req.user.uid);
    if (!wedding) {
      return res.status(404).json({ message: 'Wedding not found' });
    }
    res.json({ message: 'Wedding deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createWedding,
  getWeddings,
  getWeddingById,
  updateWedding,
  deleteWedding,
};