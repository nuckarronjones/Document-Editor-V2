# Document Editor SPA

## Overview

This project is a refactored version of my older document editor application, now implemented with a modular JavaScript approach. Inspired by the core principles of Angular, I restructured the application as a single-page application (SPA) to dive deeper into fundamental JavaScript concepts. Original repository here: https://github.com/nuckarronjones/Document-Editor. 

## Key Features

- **Modular JavaScript Architecture:** The application is divided into modules, making it more maintainable and scalable.
- **Single Page Application (SPA):** Utilizes JavaScript to dynamically update the UI without requiring full-page reloads.
- **Core JavaScript Fundamentals:** Explores concepts like:
  - Services and dependency injection
  - Event-driven programming
  - DOM rendering and event listeners
  - Component-based structuring

## Technologies Used

### Frontend:
- **HTML:** Markup structure for the document editor.  
- **CSS:** Styling for a clean and user-friendly interface.  
- **JavaScript (Vanilla):** Core logic implementing modular programming principles.

### Backend:
- **Node.js & Express:** Server-side logic and routing.  
- **MongoDB & Mongoose:** Persistent storage of user-created documents.  

## Getting Started

### 1. Install Dependencies

Navigate to the `backend` folder and install the required dependencies:

```bash
cd backend
npm install
```

### 2. Configure Environment Variables
#### Server Configuration
PORT=5501  # Replace with your desired port

#### Database
MONGO_URI=your_mongodb_connection_string_here

#### Authentication
JWT_SECRET=your_jwt_secret_here

### 3. Run the Server

```bash
npm start
```
### 4. Register a User
- Open the login interface in your browser.
- Register a new user.
- Start using the document editor!
