import React from 'react';
import { Link } from 'react-router-dom';
import { recipes } from '../data/recipes';
import placeholderImage from '../assets/placeholder.png';
import './RecipePage.css';

function RecipePage() {
  return (
    <div className="recipe-page">
      <div className="recipe-page-header">
        <h1 className="recipe-page-title">Recipes!</h1>
        <Link to="/create-recipe" className="create-recipe-link">Create New Recipe</Link>
      </div>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipe-link">
            <div className="recipe-card">
              <div className="recipe-title">{recipe.title}</div>
              <div className="recipe-image">
                <img 
                  src={recipe.image || placeholderImage} 
                  alt={recipe.description}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderImage;
                  }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecipePage;