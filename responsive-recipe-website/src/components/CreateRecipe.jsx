import React, { useState } from 'react';
import './CreateRecipe.css';

function CreateRecipe() {
  const [title, setTitle] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('New Recipe:', { title, prepTime, cookTime, ingredients, instructions, file });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  return (
    <div className="create-recipe">
      <h1>Create New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Recipe Name:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prepTime">Prep Time:</label>
          <input
            type="text"
            id="prepTime"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cookTime">Cook Time:</label>
          <input
            type="text"
            id="cookTime"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="5"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows="10"
            required
          />
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
            <img src={preview} alt={`Preview of ${title}`} />
          </div>
        )}
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipe;