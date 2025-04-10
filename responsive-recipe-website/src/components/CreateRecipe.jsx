import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CreateRecipe.css";

function CreateRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    prepTime: "",
    cookTime: "",
    ingredients: [{ name: "", quantity: "" }], // Initialize with an object
    instructions: [],
    imageUrl: "",
  });
  const [preview, setPreview] = useState("");

  const fetchRecipeData = useCallback(async () => {
    if (!id) return;
    
    try {
      const response = await fetch(`http://localhost:5000/recipes/${id}`);
      const data = await response.json();
  
      // Transform instructions from objects to strings
      const formattedInstructions = data.instructions
        .sort((a, b) => a.step_number - b.step_number)
        .map((instruction) => instruction.description);
      
      // Extract just the numeric part from prep_time and cook_time
      const prepTimeNumeric = data.prep_time ? data.prep_time.replace(/\D/g, '') : '';
      const cookTimeNumeric = data.cook_time ? data.cook_time.replace(/\D/g, '') : '';
  
      setFormData({
        title: data.title,
        prepTime: prepTimeNumeric, // Store only the numeric part
        cookTime: cookTimeNumeric, // Store only the numeric part
        ingredients: data.ingredients,
        instructions: formattedInstructions,
        imageUrl: data.image_url,
      });
  
      if (data.image_url) {
        setPreview(data.image_url);
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchRecipeData();
    }
  }, [id, fetchRecipeData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      title: formData.title,
      prepTime: formData.prepTime,
      cookTime: formData.cookTime,
      ingredients: formData.ingredients,
      instructions: formData.instructions.map((instruction, index) => ({
        step_number: index + 1,
        description: instruction,
      })),
      imageUrl: formData.imageUrl,
    };

    try {
      const url = id
        ? `http://localhost:5000/recipes/${id}`
        : "http://localhost:5000/recipes";

      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to ${id ? "update" : "create"} recipe`
        );
      }

      const data = await response.json();
      console.log(`Recipe ${id ? "updated" : "created"}:`, data);
      alert(`Recipe ${id ? "updated" : "created"} successfully!`);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to ${id ? "update" : "create"} recipe: ` + error.message);
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
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
    if (!selectedFile) return;

    // Create safe URL object
    const imageUrl = URL.createObjectURL(selectedFile);
    setFormData({ ...formData, imageUrl });
    setPreview(imageUrl);
  };

  const handleRemoveIngredient = (indexToRemove) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const handleRemoveInstruction = (indexToRemove) => {
    setFormData({
      ...formData,
      instructions: formData.instructions.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  // Add this handler function
  const handleTimeChange = (field, value) => {
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  // Add this new function after your other handlers
  const handleDelete = async () => {
    if (!id) return; // Only proceed if we have an ID

    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        const response = await fetch(`http://localhost:5000/recipes/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete recipe");
        }

        alert("Recipe deleted successfully!");
        navigate("/"); // Return to recipe list
      } catch (error) {
        console.error("Error deleting recipe:", error);
        alert("Failed to delete recipe: " + error.message);
      }
    }
  };

  useEffect(() => {
    return () => {
      // Clean up any created object URLs when component unmounts
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="create-recipe">
      <h1>{id ? "Edit Recipe" : "Create New Recipe"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Recipe Name:</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prepTime">Prep Time (minutes):</label>
          <input
            type="text"
            id="prepTime"
            value={formData.prepTime}
            onChange={(e) => handleTimeChange("prepTime", e.target.value)}
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
            onChange={(e) => handleTimeChange("cookTime", e.target.value)}
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
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
                placeholder="Quantity"
                className="quantity-input"
              />
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
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
            onClick={() =>
              setFormData({
                ...formData,
                ingredients: [
                  ...formData.ingredients,
                  { name: "", quantity: "" },
                ],
              })
            }
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
            onClick={() =>
              setFormData({
                ...formData,
                instructions: [...formData.instructions, ""],
              })
            }
          >
            Add Step
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="file">Upload Photo</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        {preview && (
          <div className="image-preview">
            <img src={preview} alt={`Preview of ${formData.title}`} />
          </div>
        )}
        <div className="form-actions">
          <button type="submit">{id ? "Update Recipe" : "Add Recipe"}</button>
          {id && (
            <button type="button" onClick={handleDelete} className="delete-btn">
              Delete Recipe
            </button>
          )}
        </div>
      </form>

      {/* Recipe Preview Section */}
      <div className="recipe-preview">
        <h2>Recipe Preview</h2>
        <div className="preview-content">
          <h3>{formData.title || "Recipe Name"}</h3>

          <div className="preview-times">
            {formData.prepTime && formData.prepTime !== "0" && (
              <p>
                <strong>Prep Time:</strong> {formData.prepTime} minutes
              </p>
            )}
            {formData.cookTime && formData.cookTime !== "0" && (
              <p>
                <strong>Cook Time:</strong> {formData.cookTime} minutes
              </p>
            )}
            {formData.prepTime && formData.cookTime && (
              <p>
                <strong>Total Time:</strong>{" "}
                {parseInt(formData.prepTime) + parseInt(formData.cookTime)}{" "}
                minutes
              </p>
            )}
          </div>

          {formData.ingredients.length > 0 && (
            <div className="preview-ingredients">
              <h4>Ingredients</h4>
              <ul>
                {formData.ingredients.map((ingredient, index) => (
                  <li key={`preview-ing-${index}`}>
                    {ingredient.quantity} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {formData.instructions.length > 0 && (
            <div className="preview-instructions">
              <h4>Instructions</h4>
              <ol>
                {formData.instructions.map((instruction, index) => (
                  <li key={`preview-inst-${index}`}>{instruction}</li>

                ))}
              </ol>
            </div>
          )}

          {preview && (
            <div className="preview-image">
              <img src={preview} alt={`Preview of ${formData.title}`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateRecipe;