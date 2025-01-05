import express from 'express';
import { submitReview, checkReviewExists, getCarReviews } from '../controllers/reviewController.js';

const router = express.Router();

// Route to submit a review
router.post('/', submitReview);

// Route to check if a review exists
router.get('/check', checkReviewExists);

// Route to get average rating and all reviews for a car
router.get('/:vehicleId', getCarReviews);

export default router;
