import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import placeholderImage from '../assets/placeholder.png';
import '../styles/RecipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/recipes/${id}`);
      if (!response.ok) {
        throw new Error('Recipe not found');
      }
      const data = await response.json();
      setRecipe({
        ...data,
        image: data.image_url || placeholderImage,
        prepTime: data.prep_time,
        cookTime: data.cook_time,
        totalTime: data.total_time
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="recipe-details-container">
      <div className="recipe-details">
        <div className="recipe-header">
          <div className="recipe-title">{recipe.title}</div>
          <Link to={`/edit-recipe/${recipe.id}`} className="edit-recipe-link">
            Edit this recipe
          </Link>
        </div>
        <div className="recipe-content">
          <div className="recipe-image">
            <img 
              src={recipe.image} 
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
                  <li key={index}>{`${ingredient.quantity} ${ingredient.name}`}</li>
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
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction.description}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;