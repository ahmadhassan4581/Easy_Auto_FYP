import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Review = () => {
  const { state } = useLocation();
  const { car } = state || {};

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');
  const [isReviewExists, setIsReviewExists] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  useEffect(() => {
    const checkExistingReview = async () => {
      if (userId && car?.id) {
        try {
          const response = await axios.get(`http://localhost:4000/api/reviews/check`, {
            params: {
              userId,
              vehicleId: car.id,
            },
          });

          if (response.data.exists) {
            setIsReviewExists(true);
            setMessage('You have already submitted a review for this car.');
          }
        } catch (error) {
          setMessage('Error checking existing review.');
        }
      }
    };

    checkExistingReview();
  }, [userId, car?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !car?.id) {
      setMessage('User or car information is missing.');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      await axios.post(
        `http://localhost:4000/api/reviews`,
        {
          userId,
          vehicleId: car.id,
          rating,
          reviewText: review,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('Review submitted successfully!');
      setIsReviewExists(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error submitting the review.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 space-y-6">
        <h2 className="text-center text-2xl font-bold text-gray-900">Review Car</h2>
        {car && (
          <>
            <p className="text-lg text-gray-700">
              <strong>Car:</strong> {car.make} {car.model} ({car.year})
            </p>
            {isReviewExists ? (
              <p className="text-red-500">{message}</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Review</label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            )}
          </>
        )}
        {message && !isReviewExists && <p className="text-green-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Review;
