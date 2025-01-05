import React, { useContext, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CartContext } from '../context/CarContext';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51PaePxCaWz00BLNq46V9vFgbjvTUUIo1o2VUt55oue2Zjh7IBB5Sv4KKrJbzv3DKXV9hdfLynLsusvDmvPdffULb00zsrmLxtQ');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { cart } = useContext(CartContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);

    const totalAmount = cart.reduce((acc, car) => acc + car.price, 0);

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/payment/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: totalAmount }),
                });
                if (!response.ok) throw new Error(`Error: ${response.statusText}`);
                const data = await response.json();
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error('Error fetching client secret:', error);
                setError('Failed to retrieve client secret.');
            }
        };
        fetchClientSecret();
    }, [totalAmount]);

    const handlePurchase = async (userId, selectedCars) => {
        try {
            for (const car of selectedCars) {
                // Save purchase record
                const purchaseResponse = await fetch('http://localhost:4000/api/purchase/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId,
                        carId: car.id,
                        showroomId:car.showroomId,
                        carPrice: car.price
                    }),
                });
    
                if (!purchaseResponse.ok) {
                    const errorData = await purchaseResponse.json();
                    console.error('Error saving purchase data:', errorData);
                    throw new Error(`Failed to save purchase for car ID: ${car.id}`);
                }
    
                // Post maintenance service record
                const maintenanceResponse = await fetch('http://localhost:4000/api/maintenance-services/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        carId: car.id,
                        userId: userId,
                        description: 'Initial maintenance scheduled',
                        odometerReading: 50,
                        serviceDetails: ['Oil check', 'Battery test'],
                        totalCost: 50, // Example cost
                        nextServiceDue: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
                    }),
                });
                
    
                if (!maintenanceResponse.ok) {
                    const maintenanceError = await maintenanceResponse.json();
                    console.error('Error saving maintenance service record:', maintenanceError);
                    throw new Error(`Failed to save maintenance service for car ID: ${car.id}`);
                }
            }
        } catch (error) {
            console.error('Error in handlePurchase:', error);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements || !clientSecret) {
            setError('Stripe has not loaded correctly or missing client secret.');
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (error) {
                setError(error.message);
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                setSuccess(true);

                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user?.id;
                const selectedCars = JSON.parse(localStorage.getItem('selectedCars')); // Use the cart context directly

                if (userId && selectedCars.length > 0) {
                    await handlePurchase(userId, selectedCars);
                }
                navigate('/');
            }
        } catch (error) {
            console.error('Error confirming card payment:', error);
            setError('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter Payment Information</h2>
            <p className="text-gray-600 mb-6">Total Amount: PKR {totalAmount}</p>

            <CardElement className="p-4 border rounded-md mb-6" />

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Payment successful! Thank you for your order.</p>}

            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

const PlaceOrder = () => {
    return (
        <Elements stripe={stripePromise}>
            <div className="max-w-4xl mx-auto my-16 px-4 md:px-8">
                <CheckoutForm />
            </div>
        </Elements>
    );
};

export default PlaceOrder;
