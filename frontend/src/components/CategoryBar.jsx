import React from 'react';
import '../styles/categoryBar.css';

const CategoryBar = ({ selectedCategory, onSelectCategory }) => {
  const categories = [
    { id: 'meal', label: 'Meal' },
    { id: 'dessert', label: 'Dessert' },
    { id: 'drinks', label: 'Drinks' }
  ];

  return (
    <div className="category-bar">
      <div className="category-container">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
