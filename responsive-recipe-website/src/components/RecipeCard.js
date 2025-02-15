import React from 'react';
import './RecipeCard.css';

function RecipeCard({ title, image }) {
  return (
    <div className="recipe-card">
      <div className="recipe-title">{title}</div>
      <div className="recipe-image">
        <img src={image} alt={title} />
      </div>
    </div>
  );
}

export default RecipeCard;