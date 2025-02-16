# 1-2_Group10_FrontendUI

## Viewing Wireframe Files from the Build Folder

To view the wireframe files from the build folder on your local machine using npm, follow the instructions below for your operating system.

### Prerequisites

- Ensure Node.js and npm are installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

### Windows, macOS, and Linux Instructions

1. Open terminal.
2. Navigate to the project directory using the `cd` command:
   ```sh
   cd path\to\your\project\directory
   ```
3. Install the `serve` package globally:
   ```sh
   npm install -g serve
   ```
4. Navigate to the build folder:
   ```sh
   cd path\to\your\build\folder
   ```
5. Start the server using the `serve` command:
   ```sh
   serve -s .
   ```

### Notes
- Ensure Node.js and npm are installed.
- The default port used by `serve` is 5000.

With these instructions, team members can easily view the wireframe files from the build folder on their local machines using npm, regardless of their operating system.