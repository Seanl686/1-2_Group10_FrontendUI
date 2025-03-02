import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import placeholderImage from '../assets/placeholder.png';
import '../styles/RecipePage.css';

function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:5000/recipes');
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading recipes...</div>;
  if (error) return <div className="error">Error: {error}</div>;

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
                  src={recipe.image_url || placeholderImage} 
                  alt={recipe.title}
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