import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [purchasedCars, setPurchasedCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.id;
      const token = localStorage.getItem('token');

      if (!userId) {
        setError('User not found in local storage.');
        return;
      }

      try {
        // Fetch user details
        const { data: userData } = await axios.get(`http://localhost:4000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userData);

        // Fetch purchased cars for the user
        const { data: carsData } = await axios.get(`http://localhost:4000/api/purchase/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Extract the purchases array and map to car details
        const cars = carsData.purchases.map((purchase) => ({
          id: purchase.carId._id,
          make: purchase.carId.make,
          model: purchase.carId.model,
          year: purchase.carId.year,
          price: purchase.carPrice,
          imagePath: purchase.carId.imagePath,
          purchaseDate: purchase.purchaseDate,
        }));
        setPurchasedCars(cars);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching data.');
      }
    };

    fetchUserData();
  }, []);

  const handleReviewClick = (car) => {
    navigate('/review', { state: { car } });
  };

  const handleMaintenanceClick = (carId) => {
    navigate(`/maintenance-details/${carId}`);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  return user ? (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12">
      <div className="max-w-6xl w-full bg-white shadow-md rounded-lg p-8">
        {/* User Profile Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Profile</h2>
          <p className="text-lg text-gray-700 mt-4">
            <strong>Name:</strong> {user.name}
          </p>
        </div>

        {/* Purchased Cars Section */}
        <h3 className="text-2xl font-bold text-gray-900">Purchased Cars</h3>
        {purchasedCars.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedCars.map((car, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <h4 className="text-lg font-semibold text-gray-800">
                  {car.make} {car.model} ({car.year})
                </h4>
                <img
                  src={car.imagePath}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-40 object-cover mt-2 rounded-md"
                />
                <p className="text-gray-700 mt-2">
                  <strong>Price:</strong> PKR {car.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Purchased on: {new Date(car.purchaseDate).toLocaleDateString()}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleReviewClick(car)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => handleMaintenanceClick(car.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    View Maintenance Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No cars purchased yet.</p>
        )}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-500 text-xl">Loading...</p>
    </div>
  );
};

export default Profile;
