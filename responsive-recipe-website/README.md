# React + Vite

# Recipe Web Application

A responsive React application for managing and viewing recipes, built with Vite.

## Features

- View recipe cards with titles and images
- Detailed recipe view with:
  - Ingredients list
  - Preparation times
  - Step-by-step instructions
- Create new recipes
- Edit existing recipes
--Still need to make this.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd 1-2_Group10_FrontendViteUI
```

2. Install dependencies:
```bash
npm install
npm install @vitejs/plugin-react --save-dev
```

3.
Running the Application
Development Mode
```bash
npm run dev
```
The application will start at http://localhost:# The location will be said in terminal.

Production Build
```bash
npm run build
```
```bash
npm run preview
```
File Structure
```
src/
├── assets/
│   └── placeholder.png    # Default recipe image
├── components/
│   ├── RecipePage.jsx     # Main recipe grid view
│   ├── RecipeDetails.jsx  # Detailed recipe view
│   └── CreateRecipe.jsx   # Recipe creation form
├── data/
│   └── recipes.js         # Recipe data
├── App.jsx               # Main application component
└── main.jsx             # Application entry point
```

Technologies Used
React
Vite
React Router
CSS Modules

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
