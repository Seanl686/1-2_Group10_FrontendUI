import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipePage from './components/RecipePage';
import CreateRecipe from './components/CreateRecipe';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Responsive Recipe Web App</h1>
        </header>
        <Routes>
          <Route path="/" element={<RecipePage />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
        </Routes>
        <footer className="App-footer">
          <p>&copy; 2025 Your Name</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;