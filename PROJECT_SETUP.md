# Kokkare Bellur Conservation App

A React + Vite application for the Kokkare Bellur wetland conservation initiative.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add Media Assets:**
   - Download media files from the original repository: https://github.com/studevkiran/kokkre_bellur
   - Place image files in `src/assets/`:
     - hero.mp4
     - painted_stork_gen.png
     - pelican_gen.png
     - village_birds_gen.png
   - Place favicon.png in `public/` folder

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   This starts both the Express backend (port 3000) and Vite dev server (port 5173)

4. **Build for production:**
   ```bash
   npm run build
   ```

## Features

- Interactive landing page with hero video
- Information about Kokkare Bellur wetland and conservation
- Public pledge form integrated with Google Sheets
- SQLite database for local pledge storage
- Responsive design with Tailwind CSS

## Tech Stack

- React 19
- Vite
- Express.js
- SQLite3
- Tailwind CSS
- Lucide React (icons)

## Environment

The app runs:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
