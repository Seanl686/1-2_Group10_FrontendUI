const API_URL = 'http://localhost:5000';

// Recipe-specific API functions using the schema structure
export const recipeAPI = {
  // Get all recipes with related data
  getRecipes: () => {
    return fetch(`${API_URL}/recipes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(handleResponse);
  },

  // Create new recipe with ingredients and instructions
  createRecipe: (recipeData) => {
    const { title, image_url, prep_time, cook_time, ingredients, instructions } = recipeData;
    return fetch(`${API_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        title,
        image_url,
        prep_time,
        cook_time,
        ingredients,
        instructions
      })
    }).then(handleResponse);
  },

  // Update existing recipe
  updateRecipe: (id, recipeData) => {
    return fetch(`${API_URL}/recipes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(recipeData)
    }).then(handleResponse);
  },

  // Delete recipe
  deleteRecipe: (id) => {
    return fetch(`${API_URL}/recipes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(handleResponse);
  }
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An unknown error occurred'
    }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};