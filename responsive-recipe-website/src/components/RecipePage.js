import React from 'react';
import RecipeDetails from './RecipeDetails';
import { Link } from 'react-router-dom';
import './RecipePage.css';

function RecipePage() {
  const placeholderImage = process.env.PUBLIC_URL + '/placeholder.png';

  const recipes = [
    { title: 'Recipe 1', image: placeholderImage },
    { title: 'Recipe 2', image: placeholderImage },
    { title: 'Recipe 3', image: placeholderImage },
    { title: 'Recipe 4', image: placeholderImage },
    { title: 'Recipe 5', image: placeholderImage },
    { title: 'Recipe 6', image: placeholderImage },
  ];

  return (
    <div className="recipe-page">
      <div className="recipe-page-header">
        <h1 className="recipe-page-title">Recipes!</h1>
        <Link to="/create-recipe" className="create-recipe-link">Create New Recipe</Link>
      </div>
      <div className="recipe-grid">
        {recipes.map((recipe, index) => (
          <RecipeDetails key={index} title={recipe.title} image={recipe.image} />
        ))}
      </div>
    </div>
  );
}

export default RecipePage;