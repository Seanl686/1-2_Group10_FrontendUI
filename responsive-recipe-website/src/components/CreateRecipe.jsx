import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/CreateRecipe.css';

function CreateRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    prepTime: '',
    cookTime: '',
    ingredients: [{ name: '', quantity: '' }], // Initialize with an object
    instructions: [],
    imageUrl: ''
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch recipe data if editing
      fetchRecipeData();
    }
  }, [id]);

  const fetchRecipeData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/recipes/${id}`);
      const data = await response.json();
      setFormData({
        title: data.title,
        prepTime: data.prep_time,
        cookTime: data.cook_time,
        ingredients: data.ingredients,
        instructions: data.instructions,
        imageUrl: data.image_url
      });
      if (data.image_url) {
        setPreview(data.image_url);
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format the data to match the backend schema
    const formattedData = {
        title: formData.title,
        prep_time: `${formData.prepTime} minutes`,
        cook_time: `${formData.cookTime} minutes`,
        image_url: formData.imageUrl,
        ingredients: formData.ingredients.map((ingredient, index) => ({
            name: ingredient.name,
            quantity: ingredient.quantity
        })),
        instructions: formData.instructions.map((instruction, index) => ({
            step_number: index + 1,
            description: instruction
        }))
    };

    try {
        const response = await fetch('http://localhost:5000/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create recipe');
        }

        const data = await response.json();
        console.log('Recipe created:', data);
        alert('Recipe created successfully!');
        navigate('/');
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to create recipe: ' + error.message);
    }
};

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value
    };
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    setFormData({ ...formData, instructions: updatedInstructions });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData({ ...formData, imageUrl: URL.createObjectURL(selectedFile) });
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleRemoveIngredient = (indexToRemove) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleRemoveInstruction = (indexToRemove) => {
    setFormData({
      ...formData,
      instructions: formData.instructions.filter((_, index) => index !== indexToRemove)
    });
  };

  // Add this handler function
  const handleTimeChange = (field, value) => {
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  return (
    <div className="create-recipe">
      <h1>{id ? 'Edit Recipe' : 'Create New Recipe'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Recipe Name:</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prepTime">Prep Time (minutes):</label>
          <input
            type="text"
            id="prepTime"
            value={formData.prepTime}
            onChange={(e) => handleTimeChange('prepTime', e.target.value)}
            placeholder="Enter prep time in minutes"
            pattern="\d*"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cookTime">Cook Time (minutes):</label>
          <input
            type="text"
            id="cookTime"
            value={formData.cookTime}
            onChange={(e) => handleTimeChange('cookTime', e.target.value)}
            placeholder="Enter cook time in minutes"
            pattern="\d*"
          />
        </div>
        <div className="form-group">
  <label htmlFor="ingredients">Ingredients:</label>
  {formData.ingredients.map((ingredient, index) => (
    <div key={index} className="input-group">
      <input
        type="text"
        value={ingredient.quantity}
        onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
        placeholder="Quantity"
        className="quantity-input"
      />
      <input
        type="text"
        value={ingredient.name}
        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
        placeholder={`Ingredient ${index + 1}`}
      />
      {formData.ingredients.length > 1 && (
        <button 
          type="button" 
          onClick={() => handleRemoveIngredient(index)}
          className="remove-btn"
        >
          Remove
        </button>
      )}
    </div>
  ))}
  <button 
    type="button" 
    onClick={() => setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', quantity: '' }]
    })}
  >
    Add Ingredient
  </button>
</div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions:</label>
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="input-group">
              <textarea
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
                rows="3"
              />
              {formData.instructions.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => handleRemoveInstruction(index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button 
            type="button" 
            onClick={() => setFormData({
              ...formData,
              instructions: [...formData.instructions, '']
            })}
          >
            Add Step
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="file">Upload Photo</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
          />
        </div>
        {preview && (
          <div className="image-preview">
            <img src={preview} alt={`Preview of ${formData.title}`} />
          </div>
        )}
        <button type="submit">{id ? 'Update Recipe' : 'Add Recipe'}</button>
      </form>
      <div className="recipe-times">
        <p><strong>Prep Time:</strong> {formData.prepTime} minutes</p>
        <p><strong>Cook Time:</strong> {formData.cookTime} minutes</p>
        {formData.totalTime && (
            <p><strong>Total Time:</strong> {formData.totalTime} minutes</p>
        )}
      </div>
    </div>
  );
}

export default CreateRecipe;