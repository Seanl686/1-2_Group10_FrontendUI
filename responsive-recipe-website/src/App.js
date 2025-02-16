import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RecipePage from './components/RecipePage';
import CreateRecipe from './components/CreateRecipe';
import RecipeDetails from './components/RecipeDetails';
import './App.css';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <header className="App-header">
          <h1>Responsive Recipe Web App</h1>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<RecipePage />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
        <footer className="App-footer">
          <p>&copy; 2025 Your Name</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;