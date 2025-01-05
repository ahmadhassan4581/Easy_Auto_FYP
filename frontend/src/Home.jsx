import React, { useState } from 'react';
import Hero from './components/Hero';
import Category from './components/Category';
import MostSearchCar from './components/MostSearchCar';

const Home = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleCategorySelect = (category) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  return (
    <div>
      <Hero onFilterChange={handleFilterChange} />
      <Category onCategorySelect={handleCategorySelect} />
      <MostSearchCar filters={filters} />
    </div>
  );
};

export default Home;
