import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RecipePage from './components/RecipePage.jsx';
import CreateRecipe from './components/CreateRecipe.jsx';
import RecipeDetails from './components/RecipeDetails.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Responsive Recipe Web App</h1>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <RecipePage />
            </React.Suspense>
          } />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
        <footer className="App-footer">
          <p>&copy; 2025 Your Name</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;