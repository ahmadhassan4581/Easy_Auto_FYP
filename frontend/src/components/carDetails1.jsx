// CarDetails.jsx

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CarContext'; // Import CartContext

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [showrooms, setShowrooms] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);
    const { addToCart } = useContext(CartContext); // Access addToCart function
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        // Fetch user's current location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => console.error('Error getting current location:', error)
        );
    }, []);

    useEffect(() => {
        // Fetch car details by ID
        fetch(`http://localhost:4000/api/cars/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCar(data);
                fetchShowrooms(data.make, data.model, data.year);
            })
            .catch((error) => console.error('Error fetching car details:', error));
    }, [id]);

    useEffect(() => {
        // Fetch reviews for the car
        fetch(`http://localhost:4000/api/reviews/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setReviews(data.reviews);
                setAverageRating(data.averageRating);
            })
            .catch((error) => console.error('Error fetching car reviews:', error));
    }, [id]);

    const fetchShowrooms = (make, model, year) => {
        fetch('http://localhost:4000/api/cars/all')
            .then((response) => response.json())
            .then((data) => {
                const filteredShowrooms = data
                    .filter((car) => car.make === make && car.model === model && car.year === year)
                    .map((car) => car.showroom);
                setShowrooms(filteredShowrooms);
            })
            .catch((error) => console.error('Error fetching showroom data:', error));
    };

    const handleAddToCart = () => {
        addToCart(car);
        setIsAdded(true);
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    if (!car) {
        return <div className="text-center py-20">Loading...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto my-16 px-4 md:px-8">
            <h2 className="font-bold text-4xl text-center mb-10 text-gray-800">{car.make} {car.model} ({car.year})</h2>

            <div className="flex justify-center">
                <img
                    src={car.imagePath}
                    alt={`${car.make} ${car.model}`}
                    className="w-full md:w-2/3 lg:w-1/2 h-96 object-cover rounded-xl shadow-lg"
                />
            </div>

            <div className="p-6 bg-white rounded-xl shadow-lg mt-10">

                 {/* Reviews */}
<h3 className="text-2xl font-bold mt-10 text-gray-700">Reviews</h3>
<p className="text-gray-600 mb-4">
    <strong>Average Rating:</strong> 
    <span className="ml-2">
        {[...Array(5)].map((_, index) => (
            <span key={index}>
                {averageRating > index ? '⭐' : '☆'}
            </span>
        ))}
    </span>
</p>
{reviews.length > 0 ? (
    <ul>
        {reviews.map((review) => (
            <li key={review._id} className="mb-4 border-b pb-4">
                <p><strong>Reviewer:</strong> {review.user.name}</p>
                <p>
                    <strong>Rating:</strong> 
                    <span className="ml-2">
                        {[...Array(5)].map((_, index) => (
                            <span key={index}>
                                {review.rating > index ? '⭐' : '☆'}
                            </span>
                        ))}
                    </span>
                </p>
                <p><strong>Review:</strong> {review.reviewText}</p>
                <p><strong>Date:</strong> {new Date(review.reviewDate).toLocaleDateString()}</p>
            </li>
        ))}
    </ul>
) : (
    <p className="text-gray-600">No reviews available for this car.</p>
)}

                {/* Specifications */}
                <h3 className="text-2xl font-bold mb-6 text-gray-700">Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-600">
                    <p><strong>Trim:</strong> {car.trim}</p>
                    <p><strong>Body Type:</strong> {car.bodyType}</p>
                    <p><strong>Engine Type:</strong> {car.engineType}</p>
                    <p><strong>Fuel Type:</strong> {car.fuelType}</p>
                    <p><strong>Transmission:</strong> {car.transmission || 'N/A'}</p>
                    <p><strong>Drivetrain:</strong> {car.drivetrain}</p>
                    <p><strong>Horsepower:</strong> {car.horsepower}</p>
                    <p><strong>Torque:</strong> {car.torque}</p>
                    <p><strong>Fuel Economy (City):</strong> {car.fuelEconomyCity} km/L</p>
                    <p><strong>Fuel Economy (Highway):</strong> {car.fuelEconomyHighway} km/L</p>
                    <p><strong>Fuel Tank Capacity:</strong> {car.fuelTankCapacity} liters</p>
                    <p><strong>Seating Capacity:</strong> {car.seatingCapacity}</p>
                    <p><strong>Cargo Volume:</strong> {car.cargoVolume} cubic feet</p>
                    <p><strong>Towing Capacity:</strong> {car.towingCapacity} kg</p>
                    <p><strong>Curb Weight:</strong> {car.curbWeight} kg</p>
                    <p><strong>Wheelbase:</strong> {car.wheelbase} mm</p>
                    <p><strong>Length:</strong> {car.length} mm</p>
                    <p><strong>Width:</strong> {car.width} mm</p>
                    <p><strong>Height:</strong> {car.height} mm</p>
                    <p><strong>Ground Clearance:</strong> {car.groundClearance} mm</p>
                </div>
 {/* Features */}
 <h3 className="text-2xl font-bold mt-10 text-gray-700">Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
                    <p><strong>Safety Features:</strong> {car.safetyFeatures && car.safetyFeatures.length > 0 ? car.safetyFeatures.join(', ') : 'N/A'}</p>
                    <p><strong>Interior Features:</strong> {car.interiorFeatures && car.interiorFeatures.length > 0 ? car.interiorFeatures.join(', ') : 'N/A'}</p>
                    <p><strong>Exterior Features:</strong> {car.exteriorFeatures && car.exteriorFeatures.length > 0 ? car.exteriorFeatures.join(', ') : 'N/A'}</p>
                    <p><strong>Infotainment System:</strong> {car.infotainmentSystem && car.infotainmentSystem.length > 0 ? car.infotainmentSystem.join(', ') : 'N/A'}</p>
                </div>
 {/* Pricing */}
 <h3 className="text-2xl font-bold mt-10 text-gray-700">Pricing</h3>
                <p className="text-gray-600"><strong>Price:</strong> PKR {car.price}</p>
                
 

                {/* Showroom Information */}
                <h3 className="text-2xl font-bold mt-10 text-gray-700">Showroom Information</h3>
                {showrooms.length > 0 ? (
                    <ul>
                        {showrooms.map((showroom, index) => {
                            const distance = currentLocation
                                ? calculateDistance(
                                    currentLocation.latitude,
                                    currentLocation.longitude,
                                    showroom.latitude,
                                    showroom.longitude
                                ).toFixed(2)
                                : 'Calculating...';
                            return (
                                <li key={index} className="text-gray-600">
                                    <strong>Name:</strong> {showroom.name}, <strong>Distance:</strong> {distance} km
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="text-gray-600">No showroom information available.</p>
                )}

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`mt-8 w-full py-3 font-semibold rounded-lg shadow transition ${isAdded ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                    {isAdded ? 'Added' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default CarDetails;
