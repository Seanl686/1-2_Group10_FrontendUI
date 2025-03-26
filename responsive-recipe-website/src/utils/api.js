const API_URL = 'http://localhost:5000';

// Recipe-specific API functions using the schema structure
export const recipeAPI = {
  // Get all recipes with related data
  getRecipes: async () => {
    try {
      const response = await fetch(`${API_URL}/recipes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Network error:', error);
      throw new Error('Network error: Unable to connect to the server');
    }
  },

  // Get single recipe by ID
  getRecipeById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/recipes/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Network error:', error);
      throw new Error('Network error: Unable to connect to the server');
    }
  },

  // Create new recipe with ingredients and instructions
  createRecipe: async (recipeData) => {
    try {
      const { title, image_url, prep_time, cook_time, ingredients, instructions } = recipeData;
      const response = await fetch(`${API_URL}/recipes`, {
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
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Network error:', error);
      throw new Error('Network error: Unable to connect to the server');
    }
  },

  // Update existing recipe
  updateRecipe: async (id, recipeData) => {
    try {
      const response = await fetch(`${API_URL}/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(recipeData)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Network error:', error);
      throw new Error('Network error: Unable to connect to the server');
    }
  },

  // Delete recipe
  deleteRecipe: async (id) => {
    try {
      const response = await fetch(`${API_URL}/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Network error:', error);
      throw new Error('Network error: Unable to connect to the server');
    }
  }
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    try {
      const error = await response.json();
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    } catch {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  return response.json();
};