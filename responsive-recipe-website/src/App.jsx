import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipePage from './components/RecipePage.jsx';
import CreateRecipe from './components/CreateRecipe.jsx';
import RecipeDetails from './components/RecipeDetails.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
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
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;