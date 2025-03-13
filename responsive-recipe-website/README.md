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
- Delete recipes

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd 1-2_Group10_FrontendUI
```

## Development Environment Setup

### Backend Setup
1. Navigate to the backend directory:
```bash
cd Schema
```

2. Install backend dependencies:
```bash
npm install
```

3. Start the backend development server:
```bash
npm run dev
```

The backend server will run on http://localhost:5000 with auto-reloading enabled via nodemon.
You should see this output if the server started successfully:
```
Server is running on port 5000
MongoDB Connected
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd ../responsive-recipe-website
```

2. Install frontend dependencies:
```bash
npm install
npm install @vitejs/plugin-react --save-dev
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend application will start at http://localhost:5173 (Vite's default port).
You should see output similar to:
```
  VITE v6.1.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

## Testing the Full Application
1. Make sure both servers are running in separate terminal windows
2. Open http://localhost:5173 in your browser
3. The frontend should connect to the backend API at http://localhost:5000

## Production Build
```bash
npm run build
```
```bash
npm run preview
```

## File Structure
```
responsive-recipe-website/  # Frontend
├── src/
│   ├── assets/
│   │   └── placeholder.png    # Default recipe image
│   ├── components/
│   │   ├── RecipePage.jsx     # Main recipe grid view
│   │   ├── RecipeDetails.jsx  # Detailed recipe view
│   │   └── CreateRecipe.jsx   # Recipe creation form
│   ├── data/
│   │   └── recipes.js         # Recipe data
│   ├── App.jsx               # Main application component
│   └── main.jsx             # Application entry point
└── ...

Schema/  # Backend
├── backend.js               # Express server and API routes
├── Schema 1.2               # Database schema SQL
└── package.json             # Backend dependencies
```

## Technologies Used
- React
- Vite
- React Router
- Express.js
- MongoDB (with Mongoose)
- CSS

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
