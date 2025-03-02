import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { recipes } from '../data/recipes';
import placeholderImage from '../assets/placeholder.png';
import '../styles/RecipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="recipe-details-container">
      <div className="recipe-details">
        <div className="recipe-header">
          <div className="recipe-title">{recipe.title}</div>
          <Link to={`/edit-recipe/${recipe.id}`} className="edit-recipe-link">Edit this recipe</Link>
        </div>
        <div className="recipe-content">
          <div className="recipe-image">
            <img 
              src={recipe.image || placeholderImage} 
              alt={recipe.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholderImage;
              }}
            />
          </div>
          <div className="recipe-info">
            <div className="recipe-ingredients">
              <h3>List of ingredients</h3>
              <ol>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ol>
            </div>
            <div className="recipe-times">
              <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
              <p><strong>Cook Time:</strong> {recipe.cookTime}</p>
              <p><strong>Total Time:</strong> {recipe.totalTime}</p>
            </div>
          </div>
        </div>
        <div className="instructions-title">
            <h3>Instructions</h3>
          </div>
          <div className="recipe-instructions">
            <ol>
            {recipe.instructions.split('. ').map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;