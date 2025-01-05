import express from 'express';
import Purchase from '../models/purchase_model.js';

const router = express.Router();

// POST: Create a new purchase
router.post('/', async (req, res) => {
  const { userId, carId, showroomId, carPrice } = req.body; // Accept showroomId in the request body

  try {
    const purchase = new Purchase({ userId, carId, showroomId, carPrice });
    const savedPurchase = await purchase.save();

    res.status(201).json({
      message: 'Purchase created successfully',
      purchase: savedPurchase,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating purchase',
      error: error.message,
    });
  }
});

// GET: Retrieve purchases by user ID
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const purchases = await Purchase.find({ userId })
      .populate('carId')
      .populate('showroomId'); // Populate showroom details

    if (purchases.length === 0) {
      return res.status(404).json({ message: 'No purchases found for this user' });
    }

    res.status(200).json({
      message: 'Purchases retrieved successfully',
      purchases,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving purchases',
      error: error.message,
    });
  }
});

// GET: Retrieve purchases by showroom ID
router.get('/showroom/:showroomId', async (req, res) => {
  const { showroomId } = req.params;

  try {
    const purchases = await Purchase.find({ showroomId })
      .populate('carId')
      .populate('userId'); // Populate user details if needed

    if (purchases.length === 0) {
      return res.status(404).json({ message: 'No purchases found for this showroom' });
    }

    res.status(200).json({
      message: 'Purchases retrieved successfully',
      purchases,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving purchases',
      error: error.message,
    });
  }
});

export default router;
