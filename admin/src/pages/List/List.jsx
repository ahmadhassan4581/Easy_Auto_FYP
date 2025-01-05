import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './List.css';

const List = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);

      try {
        const storedShowroom = localStorage.getItem('showroom');
        if (storedShowroom) {
          const parsedShowroom = JSON.parse(storedShowroom);
          const showroomId = parsedShowroom[0]?.showroomId;
          console.log(showroomId);
          if (showroomId) {
            const response = await axios.get('http://localhost:4000/api/cars/all');
            const allCars = response.data;
            const filteredCars = allCars.filter(car => car.showroom._id === showroomId);
            console.log(response);
            setCars(filteredCars);
          } else {
            setMessage('No showroom found.');
          }
        } else {
          setMessage('Showroom not found in local storage.');
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
        setMessage('Failed to load cars');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="car-list-container">
      <h2>Cars in Your Showroom</h2>

      {loading && <div className="loading">Loading...</div>}

      {!loading && cars.length === 0 && message && <p>{message}</p>}

      {!loading && cars.length > 0 && (
        <div className="list-table-container">
          {/* Table Header */}
          <div className="list-table-format title">
            <div>Image</div>
            <div>Title</div>
            <div>Price</div>
          </div>
          {/* Car Details */}
          {cars.map((car) => (
            <div key={car._id} className="list-table-format row">
              <img src={car.imagePath} alt={`${car.make} ${car.model}`} />
              <div>{`${car.make} ${car.model}`}</div>
              <div>${car.price.toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
