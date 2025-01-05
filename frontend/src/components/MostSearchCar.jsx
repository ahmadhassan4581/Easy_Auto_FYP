import React, { useEffect, useState } from 'react';
import CarItem from './CarItem';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const MostSearchCar = ({ filters }) => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/cars/all')
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
        setFilteredCars(removeDuplicates(data));
      })
      .catch((error) => console.error('Error fetching cars:', error));
  }, []);

  useEffect(() => {
    let updatedCars = cars;

    if (filters.seating) {
      updatedCars = updatedCars.filter(car => car.seating === parseInt(filters.seating));
    }
    if (filters.carMake) {
      updatedCars = updatedCars.filter(car => car.make === filters.carMake);
    }
    if (filters.pricing) {
      updatedCars = updatedCars.filter(car => car.price <= parseInt(filters.pricing));
    }
    if (filters.fuelType) {
      updatedCars = updatedCars.filter(car => car.fuelType === filters.fuelType);
    }
    if (filters.category) {
      updatedCars = updatedCars.filter(car => car.bodyType === filters.category);
    }

    setFilteredCars(removeDuplicates(updatedCars));
  }, [filters, cars]);

  const removeDuplicates = (carsArray) => {
    const uniqueCars = [];
    const carKeys = new Set();

    carsArray.forEach(car => {
      const key = `${car.make}-${car.model}-${car.year}`;
      if (!carKeys.has(key)) {
        carKeys.add(key);
        uniqueCars.push(car);
      }
    });

    return uniqueCars;
  };

  return (
    <div className='mx-24'>
      <h2 className='font-bold text-3xl text-center mt-16 mb-7'>Most Search Cars</h2>

      <Carousel>
        <CarouselContent>
          {filteredCars.map((car, index) => (
            <CarouselItem className="basis-1/4" key={index}>
              <CarItem car={car} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MostSearchCar;
