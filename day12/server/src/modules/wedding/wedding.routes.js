const express = require('express');
const router = express.Router();
const weddingController = require('./wedding.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

// All routes require authentication
router.use(authMiddleware);

router.post('/', weddingController.createWedding);
router.get('/', weddingController.getWeddings);
router.get('/:id', weddingController.getWeddingById);
router.put('/:id', weddingController.updateWedding);
router.delete('/:id', weddingController.deleteWedding);

module.exports = router;