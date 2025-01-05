import Review from '../models/rating_review_model.js';

// Submit a rating and review
export const submitReview = async (req, res) => {
    const { userId, vehicleId, rating, reviewText } = req.body;

    try {
        // Check if the user has already submitted a review for the vehicle
        const existingReview = await Review.findOne({ user: userId, vehicle: vehicleId });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already submitted a review for this vehicle.' });
        }

        // Create a new review
        const review = new Review({
            user: userId,
            vehicle: vehicleId,
            rating,
            reviewText,
        });

        await review.save();
        res.status(201).json({ message: 'Review submitted successfully.', review });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting review.', error: error.message });
    }
};

// Check if the user has already submitted a review
export const checkReviewExists = async (req, res) => {
    const { userId, vehicleId } = req.query;

    if (!userId || !vehicleId) {
        return res.status(400).json({ message: 'userId and vehicleId are required.' });
    }

    try {
        const review = await Review.findOne({ user: userId, vehicle: vehicleId });

        if (review) {
            return res.status(200).json({ exists: true, review });
        }

        return res.status(200).json({ exists: false });
    } catch (error) {
        return res.status(500).json({ message: 'Error checking review.', error: error.message });
    }
};

// Get average rating and all reviews for a car
export const getCarReviews = async (req, res) => {
    const { vehicleId } = req.params;

    try {
        // Fetch all reviews for the given vehicle
        const reviews = await Review.find({ vehicle: vehicleId }).populate('user', 'name email');

        if (!reviews.length) {
            return res.status(200).json({ message: 'No reviews found for this vehicle.', averageRating: 0, reviews: [] });
        }

        // Calculate average rating
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        res.status(200).json({
            averageRating,
            reviews,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews.', error: error.message });
    }
};
