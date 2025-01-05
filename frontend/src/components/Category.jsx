import React, { useState } from 'react';
import Data from '@/Shared/Data';

const Category = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryName) => {
    const newCategory = categoryName === selectedCategory ? null : categoryName; // Deselect if already selected
    setSelectedCategory(newCategory);
    onCategorySelect(newCategory); // Notify parent about the selected category
  };

  return (
    <div className="mt-40">
      <h2 className="font-bold text-3xl text-center mb-6">Browse by Type</h2>
      <div
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 px-20"
      >
        {Data.Category.map((category) => (
          <div
            key={category.id}
            className={`border rounded-xl p-3 items-center flex flex-col hover:shadow-md cursor-pointer ${
              selectedCategory === category.name ? 'bg-blue-100 border-blue-400' : ''
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <img src={category.icon} alt={category.name} width={35} height={35} />
            <h2 className="mt-2">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
