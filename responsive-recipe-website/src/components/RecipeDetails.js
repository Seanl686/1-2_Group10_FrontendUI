import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './RecipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();
  const placeholderImage = process.env.PUBLIC_URL + '/placeholder.png';

  const recipes = [
    { id: 1, title: 'Recipe 1', image: placeholderImage },
    { id: 2, title: 'Recipe 2', image: placeholderImage },
    { id: 3, title: 'Recipe 3', image: placeholderImage },
    { id: 4, title: 'Recipe 4', image: placeholderImage },
    { id: 5, title: 'Recipe 5', image: placeholderImage },
    { id: 6, title: 'Recipe 6', image: placeholderImage },
  ];

  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="recipe-details">
      <div className="recipe-header">
        <div className="recipe-title">{recipe.title}</div>
        <Link to={`/edit-recipe/${recipe.id}`} className="edit-recipe-link">Edit this recipe</Link>
      </div>
      <div className="recipe-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>
    </div>
  );
}

export default RecipeDetails;