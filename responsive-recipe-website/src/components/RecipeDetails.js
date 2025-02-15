import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './RecipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();
  const placeholderImage = process.env.PUBLIC_URL + '/placeholder.png';

  const recipes = [
    { id: 1, title: 'Recipe 1', image: placeholderImage, ingredients: ['1 cup flour', '2 eggs', '1/2 cup milk'], prepTime: '10 mins', cookTime: '20 mins', totalTime: '30 mins', instructions: 'Mix ingredients and cook.' },
    { id: 2, title: 'Recipe 2', image: placeholderImage, ingredients: ['1 cup sugar', '1/2 cup butter', '1 tsp vanilla'], prepTime: '15 mins', cookTime: '25 mins', totalTime: '40 mins', instructions: 'Mix ingredients and bake.' },
    { id: 3, title: 'Recipe 3', image: placeholderImage, ingredients: ['2 cups rice', '1 cup water', '1 tsp salt'], prepTime: '20 mins', cookTime: '30 mins', totalTime: '50 mins', instructions: 'Boil water, add rice and salt, and cook.' },
    { id: 4, title: 'Recipe 4', image: placeholderImage, ingredients: ['1 lb chicken', '1/2 cup soy sauce', '1 tbsp honey'], prepTime: '25 mins', cookTime: '35 mins', totalTime: '60 mins', instructions: 'Marinate chicken and cook.' },
    { id: 5, title: 'Recipe 5', image: placeholderImage, ingredients: ['1 cup oats', '1/2 cup milk', '1 tbsp honey'], prepTime: '30 mins', cookTime: '40 mins', totalTime: '70 mins', instructions: 'Mix ingredients and cook.' },
    { id: 6, title: 'Recipe 6', image: placeholderImage, ingredients: ['1 cup pasta', '2 cups water', '1 tsp salt'], prepTime: '35 mins', cookTime: '45 mins', totalTime: '80 mins', instructions: 'Boil water, add pasta and salt, and cook.' },
  ];

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
            <img src={recipe.image} alt={recipe.title} />
          </div>
          <div className="recipe-info">
            <div className="recipe-ingredients">
              <h3>Ingredients</h3>
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
        <div className="recipe-instructions">
          <h3>Instructions</h3>
          <p>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;