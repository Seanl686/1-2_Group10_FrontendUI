import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RecipePage from './components/RecipePage.jsx';
import CreateRecipe from './components/CreateRecipe.jsx';
import RecipeDetails from './components/RecipeDetails.jsx';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Responsive Recipe Web App</h1>
          <nav>
            <Link to="/" className="nav-button">
              <span>Home</span>
            </Link>
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
          <Route path="/edit-recipe/:id" element={<CreateRecipe />} />
        </Routes>
        <footer className="App-footer">
          <p>&copy; 2025 Group 10 CMCC</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;