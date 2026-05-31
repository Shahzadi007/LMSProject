# MERN Stack Learning Management System (LMS)

A full-featured Learning Management System built with the MERN Stack (MongoDB, Express, React, Node.js). This application allows users to register, enroll in courses, and manage educational content with role-based access control.

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [User Roles](#user-roles)
- [Database Models](#database-models)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)
- [Contributors](#contributors)

## ✨ Features

### Core Features
- ✅ User Authentication & Authorization with JWT
- ✅ Role-Based Access Control (Admin, Instructor, Student)
- ✅ Course Management (Create, Read, Update, Delete)
- ✅ Lesson Management (Create, Read, Update, Delete)
- ✅ Student Enrollment & Progress Tracking
- ✅ Admin Dashboard with Analytics
- ✅ Instructor Dashboard for Course Management
- ✅ Student Dashboard with Enrolled Courses
- ✅ Responsive Design with Bootstrap
- ✅ RESTful API Architecture

### Security Features
- Password hashing with Bcrypt
- JWT token-based authentication
- Protected API routes with middleware
- Role-based authorization middleware
- CORS enabled for secure communication

## 🛠️ Technologies Used

### Frontend
- **React JS 19** - UI library
- **React Router 7** - Client-side routing
- **Axios** - HTTP client for API communication
- **Bootstrap 5** - CSS framework
- **Context API** - State management (optional)

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 9** - ODM for MongoDB
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing
- **Dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing

### Tools & Services
- **Nodemon** - Development server auto-reload
- **Git** - Version control

## 📁 Project Structure

```
lms-starter-project/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/              # Business logic
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   ├── lessonController.js
│   │   ├── userController.js
│   │   └── analyticsController.js
│   ├── middleware/               # Custom middleware
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── notFoundMiddleware.js
│   ├── models/                   # Database schemas
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   └── Lesson.js
│   ├── routes/                   # API routes
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   ├── lessonRoutes.js
│   │   ├── userRoutes.js
│   │   └── analyticsRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env                      # Environment variables
│   ├── server.js                 # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js          # Axios configuration
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.js    # Auth context (optional)
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Courses.jsx
│   │   │   │   ├── CourseDetail.jsx
│   │   │   │   └── NotFound.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── student/
│   │   │   │   ├── MyCourses.jsx
│   │   │   │   └── Profile.jsx
│   │   │   ├── instructor/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── CreateCourse.jsx
│   │   │   │   ├── ManageCourses.jsx
│   │   │   │   └── UploadLesson.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Users.jsx
│   │   │       └── Analytics.jsx
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── README.md
│
└── README.md (this file)
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** (local or cloud) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/lms-starter-project.git
cd lms-starter-project
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/lms
JWT_SECRET=your_secret_key_here
```

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory (if needed):

```bash
cp .env.example .env
```

## ▶️ Running the Application

### Backend (Terminal 1)

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

### Frontend (Terminal 2)

```bash
cd frontend
npm start
```

The frontend will start on `http://localhost:3000`

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/me` | Get current user profile | Yes |

### Course Endpoints

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|----------------|-----------------|
| GET | `/courses` | Get all courses | No | - |
| GET | `/courses/:id` | Get course details | No | - |
| POST | `/courses` | Create course | Yes | instructor, admin |
| PUT | `/courses/:id` | Update course | Yes | instructor, admin |
| DELETE | `/courses/:id` | Delete course | Yes | instructor, admin |

### Enrollment Endpoints

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|----------------|-----------------|
| POST | `/enroll` | Enroll in course | Yes | student |
| GET | `/enroll/my-courses` | Get enrolled courses | Yes | student |

### Lesson Endpoints

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|----------------|-----------------|
| POST | `/lessons` | Create lesson | Yes | instructor, admin |
| GET | `/lessons/course/:courseId` | Get course lessons | No | - |
| PUT | `/lessons/:id` | Update lesson | Yes | instructor, admin |
| DELETE | `/lessons/:id` | Delete lesson | Yes | instructor, admin |

### User Endpoints

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|----------------|-----------------|
| GET | `/users` | Get all users | Yes | admin |
| DELETE | `/users/:id` | Delete user | Yes | admin |

### Analytics Endpoints

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|----------------|-----------------|
| GET | `/analytics` | Get system analytics | Yes | admin |

## 👥 User Roles

### 1. Student
- Register and login
- Browse all courses
- Enroll in courses
- View enrolled courses
- Track progress
- View profile

### 2. Instructor
- Create courses
- Edit/update courses
- Delete courses
- Upload lessons
- Manage course content
- View student enrollments

### 3. Admin
- View all users
- Delete users
- View all courses
- View analytics
- System management

## 🗄️ Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin, instructor, student),
  createdAt: Date,
  updatedAt: Date
}
```

### Course Model
```javascript
{
  title: String,
  description: String,
  category: String,
  price: Number,
  instructor: ObjectId (User reference),
  createdAt: Date,
  updatedAt: Date
}
```

### Enrollment Model
```javascript
{
  student: ObjectId (User reference),
  course: ObjectId (Course reference),
  progress: Number (0-100),
  createdAt: Date,
  updatedAt: Date
}
```

### Lesson Model
```javascript
{
  title: String,
  content: String,
  videoUrl: String,
  course: ObjectId (Course reference),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000

# Database Configuration
MONGO_URI=mongodb://localhost:27017/lms

# JWT Configuration
JWT_SECRET=your_super_secret_key_change_this
```

### Frontend (.env)

```env
# Backend API Configuration (optional)
REACT_APP_API_URL=http://localhost:5000/api
```

## 📸 Screenshots

### Home Page
- Hero section with call-to-action
- Feature highlights
- Navigation for different user types

### Courses Page
- List of all available courses
- Search functionality
- Course cards with details
- Enroll button

### Course Detail Page
- Full course information
- Lessons list
- Enrollment status
- Responsive layout

### Student Dashboard
- My Enrolled Courses
- Progress tracking
- Course management

### Instructor Dashboard
- Create Course option
- Manage Courses
- Add Lessons
- Course Management table

### Admin Dashboard
- User Management
- Course Management
- Analytics & Reports
- System Overview

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🆘 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or provide a valid MongoDB Atlas URI
- Check the `MONGO_URI` in `.env` file

### Port Already in Use
- Change the PORT in `.env` to an available port
- Or kill the process using the current port

### CORS Error
- Ensure backend is running on the correct port
- Check API URL in frontend axios configuration

### Dependencies Installation Error
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## 📞 Support

For support, email support@lms.com or open an issue on GitHub.

---

**Happy Learning! 🎓**
