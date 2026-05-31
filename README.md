# Learning Management System (LMS)

## Project Overview

The Learning Management System is a comprehensive web-based platform designed to facilitate online education. It allows instructors to create and manage courses, upload lessons, and track student progress. Students can enroll in courses, access learning materials, and track their course completion. Administrators have full control over user management and platform analytics.

Key Features:
- User authentication and role-based access control (Admin, Instructor, Student)
- Course creation and management by instructors
- Lesson upload and organization
- Student enrollment and progress tracking
- Analytics and reporting for administrators
- Responsive user interface for desktop and mobile devices

## Installation Steps

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (or your configured database)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Create a .env file in the backend directory
   - Add required configuration variables (database URL, JWT secret, port, etc.)

4. Seed the database (optional):
   ```
   npm run seed
   ```

5. Start the server:
   ```
   npm start
   ```

The backend server will run on the configured port (default: 5000)

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure API endpoints:
   - Update the API base URL in src/api/axios.js if needed

4. Start the development server:
   ```
   npm start
   ```

The frontend application will open in your browser at http://localhost:3000

## Technologies Used

### Backend
- Node.js - JavaScript runtime
- Express.js - Web framework
- MongoDB - Database
- JWT (JSON Web Tokens) - Authentication
- Bcrypt - Password hashing

### Frontend
- React - UI library
- React Router - Client-side routing
- Axios - HTTP client
- CSS - Styling

### Development Tools
- npm - Package manager
- Git - Version control
