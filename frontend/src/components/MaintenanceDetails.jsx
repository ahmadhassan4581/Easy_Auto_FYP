import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MaintenanceDetails = () => {
  const { carId } = useParams();
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [isImageDisplayed, setIsImageDisplayed] = useState(false);

  const [newService, setNewService] = useState({
    description: '',
    odometerReading: '',
    serviceDetails: '',
    totalCost: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          `http://localhost:4000/api/maintenance-services/${carId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setServices(data.data);
      } catch (err) {
        console.error('Failed to fetch maintenance details:', err);
        setError('Unable to fetch maintenance details.');
      }
    };

    fetchServices();
  }, [carId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('token');
      const nextServiceDue = new Date();
      nextServiceDue.setMonth(nextServiceDue.getMonth() + 1);
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.id;
      const payload = {
        ...newService,
        serviceDetails: newService.serviceDetails.split(','),
        totalCost: parseFloat(newService.totalCost),
        odometerReading: parseInt(newService.odometerReading, 10),
        nextServiceDue: nextServiceDue.toISOString(),
        carId,
        userId,
      };

      const { data } = await axios.post(
        'http://localhost:4000/api/maintenance-services/',
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setServices((prev) => [...prev, data.data]);
      setNewService({ description: '', odometerReading: '', serviceDetails: '', totalCost: '' });
      setSuccessMessage('Service record added successfully!');
    } catch (err) {
      console.error('Failed to add maintenance service:', err);
      setError('Unable to add maintenance service.');
    }
  };

  return (
    <div className="p-6 lg:p-12">
      <h1 className="text-2xl font-bold text-center mb-6">Maintenance Details for Car ID: {carId}</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

      {/* Add Service Form */}
      <form
        onSubmit={handleAddService}
        className="bg-white shadow-md rounded-lg p-6 mb-8 max-w-3xl mx-auto"
      >
        <h2 className="text-lg font-semibold mb-4">Add New Service</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Description:</label>
            <input
              type="text"
              name="description"
              value={newService.description}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Odometer Reading (km):</label>
            <input
              type="number"
              name="odometerReading"
              value={newService.odometerReading}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Service Details (comma-separated):</label>
            <input
              type="text"
              name="serviceDetails"
              value={newService.serviceDetails}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Total Cost (RS):</label>
            <input
              type="number"
              step="0.01"
              name="totalCost"
              value={newService.totalCost}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Service
        </button>
      </form>

      {/* Existing Services */}
      <div className="max-w-4xl mx-auto">
        {services.length > 0 ? (
          services.map((service, index) => (
            <div
              key={service._id}
              className="bg-white shadow-md rounded-lg p-6 mb-6"
            >
              {!isImageDisplayed && index === 0 && (
                <div className="mb-4">
                  <img
                    src={service.carId.imagePath}
                    alt={`${service.carId.make} ${service.carId.model}`}
                    className="w-full max-w-xs mx-auto"
                  />
                  <p className="text-center mt-2 font-medium">
                    {service.carId.make} {service.carId.model} ({service.carId.year})
                  </p>
                </div>
              )}
              <h3 className="text-lg font-semibold mb-2">Service ID: {service._id}</h3>
              <p className="mb-1"><strong>Description:</strong> {service.description}</p>
              <p className="mb-1"><strong>Odometer Reading:</strong> {service.odometerReading} km</p>
              <p className="mb-1"><strong>Total Cost:</strong> RS {service.totalCost}</p>
              <p className="mb-1"><strong>Date:</strong> {new Date(service.date).toLocaleDateString()}</p>
              <p className="mb-1"><strong>Next Service Due:</strong> {new Date(service.nextServiceDue).toLocaleDateString()}</p>
              <p className="mb-2"><strong>Service Details:</strong></p>
              <ul className="list-disc list-inside">
                {service.serviceDetails.map((detail, detailIndex) => (
                  <li key={detailIndex}>{detail}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No services found for this car.</p>
        )}
      </div>
    </div>
  );
};

export default MaintenanceDetails;
