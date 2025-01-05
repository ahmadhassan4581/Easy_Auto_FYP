import React, { useEffect, useState } from 'react';

const Comparison = () => {
  const [cars, setCars] = useState([]); // Store all cars fetched from the API
  const [selectedCar1, setSelectedCar1] = useState(null); // Store first selected car
  const [selectedCar2, setSelectedCar2] = useState(null); // Store second selected car
  const [searchTerm1, setSearchTerm1] = useState(''); // Search term for first car
  const [searchTerm2, setSearchTerm2] = useState(''); // Search term for second car

  useEffect(() => {
    // Fetch all cars from the API
    fetch('http://localhost:4000/api/cars/all')
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error('Error fetching cars:', error));
  }, []);

  // Filter cars based on search terms
  const filteredCars1 = cars.filter((car) =>
    `${car.make} ${car.model} ${car.year}`.toLowerCase().includes(searchTerm1.toLowerCase())
  );

  const filteredCars2 = cars.filter((car) =>
    `${car.make} ${car.model} ${car.year}`.toLowerCase().includes(searchTerm2.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Compare Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Search and Select for Car 1 */}
        <div>
          <input
            type="text"
            placeholder="Search for first car"
            value={searchTerm1}
            onChange={(e) => setSearchTerm1(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />
          <ul className="border rounded max-h-48 overflow-y-auto">
            {filteredCars1.map((car) => (
              <li
                key={car._id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => setSelectedCar1(car)}
              >
                {car.make} {car.model} ({car.year})
              </li>
            ))}
          </ul>
          {selectedCar1 && (
            <div className="mt-6 p-4 border rounded bg-gray-100">
              <h3 className="text-xl font-bold">{selectedCar1.make} {selectedCar1.model} ({selectedCar1.year})</h3>
              <p><strong>Price:</strong> PKR {selectedCar1.price}</p>
              <p><strong>Engine:</strong> {selectedCar1.engineType}</p>
              <p><strong>Horsepower:</strong> {selectedCar1.horsepower}</p>
              <p><strong>Fuel Type:</strong> {selectedCar1.fuelType}</p>
              <img src={selectedCar1.imagePath} alt={selectedCar1.make} className="w-full h-48 object-cover mt-4 rounded" />
            </div>
          )}
        </div>

        {/* Search and Select for Car 2 */}
        <div>
          <input
            type="text"
            placeholder="Search for second car"
            value={searchTerm2}
            onChange={(e) => setSearchTerm2(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />
          <ul className="border rounded max-h-48 overflow-y-auto">
            {filteredCars2.map((car) => (
              <li
                key={car._id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => setSelectedCar2(car)}
              >
                {car.make} {car.model} ({car.year})
              </li>
            ))}
          </ul>
          {selectedCar2 && (
            <div className="mt-6 p-4 border rounded bg-gray-100">
              <h3 className="text-xl font-bold">{selectedCar2.make} {selectedCar2.model} ({selectedCar2.year})</h3>
              <p><strong>Price:</strong> PKR {selectedCar2.price}</p>
              <p><strong>Engine:</strong> {selectedCar2.engineType}</p>
              <p><strong>Horsepower:</strong> {selectedCar2.horsepower}</p>
              <p><strong>Fuel Type:</strong> {selectedCar2.fuelType}</p>
              <img src={selectedCar2.imagePath} alt={selectedCar2.make} className="w-full h-48 object-cover mt-4 rounded" />
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      {selectedCar1 && selectedCar2 && (
        <div className="mt-10 p-6 bg-white border rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-gray-700">Comparison</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Specification</th>
                <th className="border-b p-2">{selectedCar1.make} {selectedCar1.model}</th>
                <th className="border-b p-2">{selectedCar2.make} {selectedCar2.model}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b p-2">Price</td>
                <td className="border-b p-2">PKR {selectedCar1.price}</td>
                <td className="border-b p-2">PKR {selectedCar2.price}</td>
              </tr>
              <tr>
                <td className="border-b p-2">Engine Type</td>
                <td className="border-b p-2">{selectedCar1.engineType}</td>
                <td className="border-b p-2">{selectedCar2.engineType}</td>
              </tr>
              <tr>
                <td className="border-b p-2">Horsepower</td>
                <td className="border-b p-2">{selectedCar1.horsepower}</td>
                <td className="border-b p-2">{selectedCar2.horsepower}</td>
              </tr>
              <tr>
                <td className="border-b p-2">Fuel Type</td>
                <td className="border-b p-2">{selectedCar1.fuelType}</td>
                <td className="border-b p-2">{selectedCar2.fuelType}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Comparison;
