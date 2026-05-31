# 🚀 LMS - Quick Start Guide

Get your Learning Management System running in 5 minutes!

## ⚡ Prerequisites

Ensure you have installed:
- **Node.js** (v14+) - [Download](https://nodejs.org/)
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Git**

## 📝 Step 1: Environment Setup

### Backend Configuration

```bash
cd backend
```

Edit `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/lms
JWT_SECRET=your_super_secret_key
```

**For MongoDB Atlas Cloud:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/lms
```

### Frontend Configuration (Optional)

```bash
cd frontend
```

Edit `.env` file (or leave default):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🔧 Step 2: Install Dependencies

### Backend Installation

```bash
cd backend
npm install
```

### Frontend Installation

```bash
cd frontend
npm install
```

## ▶️ Step 3: Start the Application

### Terminal 1 - Backend Server

```bash
cd backend
npm run dev
```

✅ Backend running on: `http://localhost:5000`

### Terminal 2 - Frontend Application

```bash
cd frontend
npm start
```

✅ Frontend running on: `http://localhost:3000`

## 🧪 Step 4: Test the Application

### Create Test Accounts

#### 1. Student Account
- Go to http://localhost:3000
- Click "Register"
- Fill form with:
  - Name: `John Student`
  - Email: `student@example.com`
  - Password: `password123`
  - Role: **Student**
- Click Register → Login

#### 2. Instructor Account
- Register with:
  - Name: `Jane Instructor`
  - Email: `instructor@example.com`
  - Password: `password123`
  - Role: **Instructor**

#### 3. Admin Account (via Backend)
- Create manually using MongoDB:

```javascript
// MongoDB command
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "hashed_password", // Use bcrypt to hash "password123"
  role: "admin",
  createdAt: new Date()
})
```

Or use this Node.js script in backend:

```javascript
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function createAdmin() {
  const password = await bcrypt.hash('password123', 10);
  await User.create({
    name: "Admin User",
    email: "admin@example.com",
    password,
    role: "admin"
  });
  console.log("Admin created!");
}

createAdmin();
```

## 📖 Usage Workflow

### As Student

1. ✅ Login with student account
2. ✅ Go to "Courses" → Browse courses
3. ✅ Click "View Details" on a course
4. ✅ Click "Enroll in Course"
5. ✅ Go to "My Courses" to see enrolled courses
6. ✅ View your profile

### As Instructor

1. ✅ Login with instructor account
2. ✅ Go to "Instructor" → "Dashboard"
3. ✅ Click "Create Course"
4. ✅ Fill course details:
   - Title: `React Basics`
   - Description: `Learn React fundamentals`
   - Category: `Programming`
   - Price: `0` (free)
5. ✅ Go to "Manage Courses"
6. ✅ Click "Add Lesson" to upload lessons
7. ✅ Add lesson details:
   - Course ID: (copy from course)
   - Title: `Introduction to React`
   - Content: `React is a JavaScript library...`

### As Admin

1. ✅ Login with admin account
2. ✅ Go to "Admin" → Dashboard
3. ✅ View "Users" - see all registered users
4. ✅ View "Analytics" - system statistics
5. ✅ View "Courses" - all courses in system
6. ✅ Delete users if needed

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Check if MongoDB is running
- Verify MONGO_URI is correct
- For MongoDB Atlas, ensure IP is whitelisted

### "Port 5000 already in use"
Change in `.env`:
```env
PORT=5001
```

### "Module not found"
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### "CORS Error"
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`

### "Cannot GET /course/:id"
- Ensure you have a valid MongoDB ObjectId for course
- Check if course exists in database

## 📊 API Testing with Curl

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123","role":"student"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get All Courses
```bash
curl http://localhost:5000/api/courses
```

## 📱 Responsive Design

The application is fully responsive and works on:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px-1024px)
- ✅ Mobile (< 768px)

Test by resizing browser or using DevTools device emulation (F12 → Device Toolbar)

## 🔐 Security Notes

- Never commit `.env` file
- Change `JWT_SECRET` in production
- Use strong passwords
- Enable HTTPS in production
- Use MongoDB Atlas IP whitelist

## 📦 Production Deployment

### Build Frontend
```bash
cd frontend
npm run build
```

### Deploy Backend
1. Use Heroku, AWS, or similar
2. Set environment variables in platform
3. Deploy using platform's CLI

### Deploy Frontend
1. Use Vercel, Netlify, or similar
2. Connect GitHub repository
3. Set environment variables
4. Deploy automatically

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [JWT Info](https://jwt.io)
- [Bootstrap 5](https://getbootstrap.com)

## 🎯 Next Steps

1. ✅ Customize branding and colors
2. ✅ Add more course content
3. ✅ Configure email notifications
4. ✅ Setup payment integration
5. ✅ Deploy to production
6. ✅ Monitor analytics

## ✉️ Support

- Check README.md for detailed documentation
- Review API documentation in README
- Check browser console for errors
- Check server logs for backend errors

---

**Happy Learning! 🎓**

**Need help?** Check the main [README.md](./README.md) file for comprehensive documentation.
