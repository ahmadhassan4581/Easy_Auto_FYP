import React, { useState } from 'react';
import './Add.css';

const Add = () => {
  // State for car information
  const [car, setCar] = useState({
    make: '',
    model: '',
    year: '',
    trim: '',
    bodyType: '',
    engineType: '',
    fuelType: '',
    transmission: '',
    drivetrain: '',
    horsepower: '',
    torque: '',
    fuelEconomyCity: '',
    fuelEconomyHighway: '',
    fuelTankCapacity: '',
    seatingCapacity: '',
    cargoVolume: '',
    towingCapacity: '',
    curbWeight: '',
    wheelbase: '',
    length: '',
    width: '',
    height: '',
    groundClearance: '',
    safetyFeatures: '',
    interiorFeatures: '',
    exteriorFeatures: '',
    infotainmentSystem: '',
    basicWarranty: '',
    powertrainWarranty: '',
    price: '',
    imagePath: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar({
      ...car,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(car); // Send this data to the backend via an API call
    // Example: axios.post('/api/cars', car).then(response => console.log(response));
  };

  return (
    <div className="add-container">
      <h1>Add Car</h1>
      <form className="add-form" onSubmit={handleSubmit}>
        <label>Make:</label>
        <input type="text" name="make" value={car.make} onChange={handleChange} required />

        <label>Model:</label>
        <input type="text" name="model" value={car.model} onChange={handleChange} required />

        <label>Year:</label>
        <input type="number" name="year" value={car.year} onChange={handleChange} required />

        <label>Trim:</label>
        <input type="text" name="trim" value={car.trim} onChange={handleChange} />

        {/* Dropdown for Body Type */}
        <label>Body Type:</label>
        <select name="bodyType" value={car.bodyType} onChange={handleChange} required>
          <option value="">Select Body Type</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Coupe">Coupe</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Convertible">Convertible</option>
          <option value="Wagon">Wagon</option>
          <option value="Pickup Truck">Pickup Truck</option>
          <option value="Van">Van</option>
          <option value="Minivan">Minivan</option>
        </select>

        <label>Engine Type:</label>
<select name="engineType" value={car.engineType} onChange={handleChange} required>
  <option value="">Select Engine Type</option>
  <option value="Inline 4">Inline 4</option>
  <option value="V6">V6</option>
  <option value="V8">V8</option>
  <option value="V10">V10</option>
  <option value="V12">V12</option>
  <option value="Electric">Electric</option>
  <option value="Hybrid">Hybrid</option>
  <option value="Turbocharged">Turbocharged</option>
  <option value="Supercharged">Supercharged</option>
  <option value="Diesel">Diesel</option>
</select>

        <label>Fuel Type:</label>
<select name="fuelType" value={car.fuelType} onChange={handleChange} required>
  <option value="">Select Fuel Type</option>
  <option value="Gasoline">Gasoline</option>
  <option value="Diesel">Diesel</option>
  <option value="Electric">Electric</option>
  <option value="Hybrid">Hybrid</option>
  <option value="Hydrogen">Hydrogen</option>
</select>

       

        <label>Transmission:</label>
        <input type="text" name="transmission" value={car.transmission} onChange={handleChange} />

        <label>Drivetrain:</label>
        <input type="text" name="drivetrain" value={car.drivetrain} onChange={handleChange} />

        <label>Horsepower:</label>
        <input type="number" name="horsepower" value={car.horsepower} onChange={handleChange} />

        <label>Torque:</label>
        <input type="number" name="torque" value={car.torque} onChange={handleChange} />

        <label>Fuel Economy (City):</label>
        <input type="number" name="fuelEconomyCity" value={car.fuelEconomyCity} onChange={handleChange} />

        <label>Fuel Economy (Highway):</label>
        <input type="number" name="fuelEconomyHighway" value={car.fuelEconomyHighway} onChange={handleChange} />

        <label>Fuel Tank Capacity:</label>
        <input type="number" name="fuelTankCapacity" value={car.fuelTankCapacity} onChange={handleChange} />

        <label>Seating Capacity:</label>
        <input type="number" name="seatingCapacity" value={car.seatingCapacity} onChange={handleChange} required />

        <label>Cargo Volume:</label>
        <input type="number" name="cargoVolume" value={car.cargoVolume} onChange={handleChange} />

        <label>Towing Capacity:</label>
        <input type="number" name="towingCapacity" value={car.towingCapacity} onChange={handleChange} />

        <label>Curb Weight:</label>
        <input type="number" name="curbWeight" value={car.curbWeight} onChange={handleChange} />

        <label>Wheelbase:</label>
        <input type="number" name="wheelbase" value={car.wheelbase} onChange={handleChange} />

        <label>Length:</label>
        <input type="number" name="length" value={car.length} onChange={handleChange} />

        <label>Width:</label>
        <input type="number" name="width" value={car.width} onChange={handleChange} />

        <label>Height:</label>
        <input type="number" name="height" value={car.height} onChange={handleChange} />

        <label>Ground Clearance:</label>
        <input type="number" name="groundClearance" value={car.groundClearance} onChange={handleChange} />

        <label>Safety Features (Comma separated):</label>
        <input type="text" name="safetyFeatures" value={car.safetyFeatures} onChange={handleChange} />

        <label>Interior Features (Comma separated):</label>
        <input type="text" name="interiorFeatures" value={car.interiorFeatures} onChange={handleChange} />

        <label>Exterior Features (Comma separated):</label>
        <input type="text" name="exteriorFeatures" value={car.exteriorFeatures} onChange={handleChange} />

        <label>Infotainment System (Comma separated):</label>
        <input type="text" name="infotainmentSystem" value={car.infotainmentSystem} onChange={handleChange} />

        <label>Basic Warranty:</label>
        <input type="text" name="basicWarranty" value={car.basicWarranty} onChange={handleChange} />

        <label>Powertrain Warranty:</label>
        <input type="text" name="powertrainWarranty" value={car.powertrainWarranty} onChange={handleChange} />

        <label>Price:</label>
        <input type="number" name="price" value={car.price} onChange={handleChange} required />

        <label>Image Path:</label>
        <input type="text" name="imagePath" value={car.imagePath} onChange={handleChange} />

        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}

export default Add;
