// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Updated CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default development port
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type'], // Allowed headers
  credentials: true // Allow credentials
}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Define Schema & Model
const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image_url: { type: String },
    prep_time: { type: String },
    cook_time: { type: String },
    total_time: { type: String },
    ingredients: [{
        name: { type: String, required: true },
        quantity: { type: String, required: true }
    }],
    instructions: [{
        step_number: { type: Number, required: true },
        description: { type: String, required: true }
    }],
    created_at: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

// CRUD Routes

// Create a recipe
app.post("/recipes", async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        await newRecipe.save();
        console.log('Recipe created:', newRecipe); // Add this line
        res.status(201).json(newRecipe);
    } catch (err) {
        console.error('Error creating recipe:', err); // Add this line
        res.status(400).json({ error: err.message });
    }
});

// Read all recipes
app.get("/recipes", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read a single recipe
app.get("/recipes/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a recipe
app.put("/recipes/:id", async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!updatedRecipe) return res.status(404).json({ message: "Recipe not found" });
        res.json(updatedRecipe);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a recipe
app.delete("/recipes/:id", async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) return res.status(404).json({ message: "Recipe not found" });
        res.json({ message: "Recipe deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Add this before app.listen()
app.get("/test", (req, res) => {
    res.json({ message: "API is working" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
