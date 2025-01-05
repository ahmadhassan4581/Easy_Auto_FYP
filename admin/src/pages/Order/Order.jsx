import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const storedShowrooms = localStorage.getItem('showroom');
      const showrooms = JSON.parse(storedShowrooms);
      const showroomId = showrooms[0]?.showroomId;

      try {
        const response = await axios.get(
          `http://localhost:4000/api/purchase/showroom/${showroomId}`
        );
        setOrders(response.data.purchases);
      } catch (err) {
        setError(err.message || 'Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="order-list">
      <h2>Order List</h2>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <div className="order-table">
          <div className="order-header">
            <div>#</div>
            <div>Car</div>
            <div>User</div>
            <div>Address</div>
            <div>Phone</div>
            <div>Price</div>
          </div>
          {orders.map((order, index) => (
            <div key={order._id} className="order-row">
              <div className="order-number">{index + 1}</div>
              <div className="car-image-container">
                <img
                  src={order.carId.imagePath}
                  alt={`${order.carId.make} ${order.carId.model}`}
                  className="car-image"
                />
              </div>
              <div>{order.userId.name}</div>
              <div>{order.userId.address}</div>
              <div>{order.userId.phone}</div>
              <div>PKR {order.carPrice.toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
