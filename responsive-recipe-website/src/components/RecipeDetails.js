import React from 'react';
import './RecipeDetails.css';

function RecipeDetails({ title, image }) {
  return (
    <div className="recipe-details">
      <div className="recipe-title">{title}</div>
      <div className="recipe-image">
        <img src={image} alt={title} />
      </div>
    </div>
  );
}

export default RecipeDetails;