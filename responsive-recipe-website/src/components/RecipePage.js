import React from 'react';
import { Link } from 'react-router-dom';
import './RecipePage.css';

function RecipePage() {
  const placeholderImage = process.env.PUBLIC_URL + '/placeholder.png';

  const recipes = [
    { id: 1, title: 'Recipe 1', image: placeholderImage },
    { id: 2, title: 'Recipe 2', image: placeholderImage },
    { id: 3, title: 'Recipe 3', image: placeholderImage },
    { id: 4, title: 'Recipe 4', image: placeholderImage },
    { id: 5, title: 'Recipe 5', image: placeholderImage },
    { id: 6, title: 'Recipe 6', image: placeholderImage },
  ];

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
                <img src={recipe.image} alt={recipe.title} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecipePage;