import React, { useEffect, useState } from 'react';
import CarItem from './CarItem';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const NewCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch all cars from the API
    fetch('http://localhost:4000/api/cars/all')
      .then((response) => response.json())
      .then((data) => {
        // Sort cars by recent addition (assuming `createdAt` exists)
        const sortedCars = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setCars(sortedCars);
      })
      .catch((error) => console.error('Error fetching cars:', error));
  }, []);

  return (
    <div className='mx-24'>
      <h2 className='font-bold text-3xl text-center mt-16 mb-7'>Recently Added Cars</h2>

      <Carousel>
        <CarouselContent>
          {cars.map((car, index) => (
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

export default NewCars;
