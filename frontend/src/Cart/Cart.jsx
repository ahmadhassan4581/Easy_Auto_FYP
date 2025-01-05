import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CarContext';

const Cart = () => {
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    const handlePlaceOrder = () => {
        const selectedCars = cart.map((car) => ({
            id: car._id, // Use the car's ID
            price: car.price, // Use the car's price
            showroomId: car.showroomId, // Include the showroom ID
        }));

        localStorage.setItem('selectedCars', JSON.stringify(selectedCars));
        navigate('/place-order');
    };

    if (cart.length === 0) {
        return <div className="text-center py-20">Your cart is empty</div>;
    }

    return (
        <div className="max-w-4xl mx-auto my-16 px-4 md:px-8">
            <h2 className="font-bold text-3xl text-center mb-10 text-gray-800">Shopping Cart</h2>

            <div className="space-y-6">
                {cart.map((car, index) => (
                    <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-md">
                        <img 
                            src={car.imagePath} 
                            alt={car.model} 
                            className="w-24 h-24 object-cover rounded-lg mr-4" 
                        />
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700">{car.make} {car.model} ({car.year})</h3>
                            <p className="text-gray-600">PKR {car.price}</p>
                            <p className="text-gray-600"><strong>Showroom ID:</strong> {car.showroomId}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                onClick={handlePlaceOrder}
                className="mt-8 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
                Place Order
            </button>
        </div>
    );
};

export default Cart;
