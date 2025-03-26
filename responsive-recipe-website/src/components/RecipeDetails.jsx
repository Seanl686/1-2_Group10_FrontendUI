import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import placeholderImage from "../assets/placeholder.png";
import "../styles/RecipeDetails.css";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect if no ID is present
    if (!id) {
      navigate("/");
      return;
    }
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/recipes/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Recipe not found");
          }
          throw new Error("Failed to fetch recipe");
        }
        const data = await response.json();

        setRecipe({
          id: data._id,
          title: data.title,
          image: data.image_url || placeholderImage,
          // Remove "minutes" from the time values
          prepTime: data.prep_time,
          cookTime: data.cook_time,
          totalTime: data.total_time,
          ingredients: data.ingredients || [],
          instructions: data.instructions || [],
        });
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [id, navigate]);

  if (loading) return <div className="loading-state">Loading recipe...</div>;
  if (error)
    return (
      <div className="error-state">
        <p>Error: {error}</p>
        <Link to="/" className="back-link">
          Return to Recipes
        </Link>
      </div>
    );
  if (!recipe)
    return (
      <div className="not-found-state">
        <p>Recipe not found</p>
        <Link to="/" className="back-link">
          Return to Recipes
        </Link>
      </div>
    );

  return (
    <div className="recipe-details-container">
      <div className="recipe-details">
        <div className="recipe-header">
          <h1 className="recipe-title">{recipe.title}</h1>
          <Link to={`/edit-recipe/${recipe.id}`} className="edit-recipe-link">
            Edit Recipe
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
            <div className="recipe-times">
              <p>
                <strong>Prep Time:</strong> {recipe.prepTime}
              </p>
              <p>
                <strong>Cook Time:</strong> {recipe.cookTime}
              </p>
              {recipe.totalTime && (
                <p>
                  <strong>Total Time:</strong> {recipe.totalTime}
                </p>
              )}
            </div>

            <div className="recipe-ingredients">
              <h2>Ingredients</h2>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={`ingredient-${recipe.id}-${index}`}>
                    {ingredient.quantity} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="recipe-instructions">
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={`instruction-${recipe.id}-${index}`}>
                {instruction.description}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
