import React from 'react';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';
import './RecipePage.css';

function RecipePage() {
  const recipes = [
    { title: 'Recipe 1', image: 'path/to/image1.jpg' },
    { title: 'Recipe 2', image: 'path/to/image2.jpg' },
    { title: 'Recipe 3', image: 'path/to/image3.jpg' },
    { title: 'Recipe 4', image: 'path/to/image4.jpg' },
    { title: 'Recipe 5', image: 'path/to/image5.jpg' },
    { title: 'Recipe 6', image: 'path/to/image6.jpg' },
  ];

  return (
    <div className="recipe-page">
      <div className="recipe-page-header">
        <h1 className="recipe-page-title">Recipes!</h1>
        <Link to="/create-recipe" className="create-recipe-link">Create New Recipe</Link>
      </div>
      <div className="recipe-grid">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} title={recipe.title} image={recipe.image} />
        ))}
      </div>
    </div>
  );
}

export default RecipePage;