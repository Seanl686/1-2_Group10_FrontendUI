# Recipe Management Application

## Current Status
This application provides a functional recipe management system. Users can:
- Create and store complete recipes
- View a comprehensive recipe list
- Edit existing recipes
- Upload and manage recipe images
- Store and retrieve recipes from MongoDB database

## Progress Screenshots
![Recipe List](./images/Screenshot_2025-02-16-190425.png)
![Create Recipe](./images/Screenshot_2025-02-16-190409.png)
![Recipe Details](./images/Screenshot_2025-02-16-190441.png)

## Prerequisites
- Node.js and npm ([Download](https://nodejs.org/))
- MongoDB Community Server ([Download](https://www.mongodb.com/try/download/community))
- Git ([Download](https://git-scm.com/downloads))

## Setup Instructions

### 1. Backend Setup

1. Open terminal and navigate to the Schema directory:
   ```powershell
   cd "path-to-project\1-2_Group10_FrontendUI\Schema"
   ```

2. Install backend dependencies:
   ```powershell
   npm init -y
   npm install express mongoose cors dotenv body-parser multer
   ```

3. Start MongoDB (Run PowerShell as Administrator):
   ```powershell
   net start MongoDB
   ```

4. Start the backend server:
   ```powershell
   node backend.js
   ```

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```powershell
   cd "path-to-project\1-2_Group10_FrontendUI\responsive-recipe-website"
   ```

2. Install frontend dependencies:
   ```powershell
   npm install
   ```

3. Start development server:
   ```powershell
   npm run dev
   ```

## Features
- Create and view recipes with detailed information
- Edit existing recipes with full update capability
- Add multiple ingredients with quantities and units
- Create step-by-step cooking instructions
- Upload high-quality recipe images
- Track preparation and cooking times accurately
- Responsive design for mobile and desktop use

## Testing the Application

1. Create a Recipe:
   - Navigate to http://localhost:5173
   - Click "Create New Recipe"
   - Fill out the form with recipe details
   - Add ingredients and instructions
   - Upload an image
   - Submit the form

2. View and Edit Recipes:
   - Return to home page to see your recipe in the list
   - Click on a recipe to view its details
   - Use the edit button to modify any recipe information

3. Verify Database:
   ```powershell
   mongosh
   use recipe_db
   db.recipes.find()
   ```

## Development Notes

### Starting the Application

1. Start MongoDB (Run PowerShell as Administrator):
   ```powershell
   net start MongoDB
   ```

2. Start Backend (in Schema directory):
   ```powershell
   node backend.js
   ```

3. Start Frontend (in responsive-recipe-website directory):
   ```powershell
   npm run dev
   ```

4. Access the application at: http://localhost:5173

### Database Management
Clear recipe database:
```powershell
mongosh
use recipe_db
db.recipes.deleteMany({})
```

### Troubleshooting

#### Common Issues

1. Database Connection:
   ```powershell
   # If MongoDB won't start
   "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="c:\data\db"
   ```

2. Clear Test Data:
   ```powershell
   mongosh
   use recipe_db
   db.recipes.deleteMany({})
   ```

3. Port Conflicts:
   ```powershell
   # Check if ports are in use
   netstat -ano | findstr :5000
   netstat -ano | findstr :5173
   ```

4. Image Upload Issues:
   - Ensure the uploads directory exists in the backend
   - Check file size limits in the backend configuration

## Project Roadmap and Future Features (TBD)
- Add user authentication and personal recipe collections  
- Implement user authentication and personal recipe collections
- Add recipe rating and comments functionality
- Create recipe sharing capabilities
- Develop a mobile application version
- Implement advanced search with ingredient matching
