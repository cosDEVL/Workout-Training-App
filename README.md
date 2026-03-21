# 🏋️‍♂️ Workout Training App (MERN Stack)

⚠️ **IMPORTANT NOTE:** This project was developed **strictly for educational and learning purposes**. It is **NOT a production-ready application**. The code, architecture, and security implementations reflect a learning journey with the MERN stack and may lack optimizations or strict best practices required for a real-world production environment.

---

## 📖 Project Description
This is a Full-Stack web application built with the **MERN** stack (MongoDB, Express, React, Node.js) designed to help users track and manage their workouts. Users can register, create workout routines, add specific exercises with sets and reps, and then edit or delete the workouts created.

## ✨ Main Features

### 👤 User Management (Authentication & Authorization)
- **Registration & Login:** Secure authentication based on JWT (JSON Web Tokens).
- **Profile Management:** Users can update their personal information and password.
- **Password Recovery:** Complete flow for forgotten passwords, including secure token generation and email delivery.

### 🏋️ Workout and Exercise Management
- **Exercise Database:** View and filter a predefined list of exercises.
- **Workout Creation:** Build custom workouts by adding exercises, sets, repetitions, and weights.
- **Edit/Delete (CRUD):** Full control over registered workouts and routines.

### 🎨 UI/UX & Frontend
- **Dark/Light Mode:** Native theme system supported via React Context API.
- **User Feedback:** Custom Toast notification system for success, error, and loading messages.
- **State Management:** Centralized global state management using React Context API (Auth, Theme, Loading, Toast) without relying on heavy external libraries.
- **Routing:** Protected and dynamic navigation handled by React Router.

---

## 🛠️ Technologies Used

### Frontend (`/Client`)
- **React.js**: Core library (initialized via Vite for faster builds and development).
- **React Router DOM**: For client-side routing.
- **Context API**: For global state management.
- **CSS / SCSS**: Custom styling using CSS variables for theming, without heavy CSS frameworks.

### Backend (`/Server`)
- **Node.js & Express.js**: For building the RESTful API.
- **MongoDB & Mongoose**: NoSQL database and ODM (Object Data Modeling) for database interactions.
- **Nodemailer**: For sending emails (e.g., password reset links).
- **Bcrypt & JWT**: For password hashing and secure token generation.

### API testing and Database
- **Postman**: Used extensively during the development phase to test, debug, and document the backend RESTful API endpoints before integrating them with the frontend.
- **MongoDB Compass**: Used as the primary graphical user interface (GUI) to visualize, query, and manage the MongoDB database and its collections efficiently.

---

## 📂 Application Structure

The repository is divided into two main folders, maintaining a clear separation between Frontend and Backend.

### `Server/` (Backend)
- `config/`: Basic configurations (e.g., MongoDB connection).
- `controller/`: Core business logic (authentication, user management, exercises, and workouts).
- `middleware/`: Intermediate functions, such as `protect.js` to verify JWT tokens and secure routes.
- `model/`: Mongoose database schemas (`userSchema`, `exerciseSchema`, `workoutSchema`).
- `routes/`: REST API endpoint definitions.
- `utils/`: Helper functions (centralized error handling, email sender).
- `seeder/`: Scripts to populate the database with initial exercise data.

### `Client/` (Frontend)
- `src/components/`: Reusable React components (Navbar, buttons, input fields, exercise rows, etc.).
- `src/contextAPI/`: Global state providers (Authentication, Theme, Loading, Toast).
- `src/pages/`: Main application views (Home, Login, Signup, WorkoutMain, Profile, etc.).
- `src/styles/`: Global stylesheets and color variables (`palette.scss`).
- `src/utils/`: Frontend utility functions like data fetching helpers (`myFetch.js`) and form validation.
