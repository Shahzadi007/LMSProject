import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Courses from "../pages/public/Courses";
import CourseDetail from "../pages/public/CourseDetail";
import MyCourses from "../pages/student/MyCourses";
import InstructorDashboard from "../pages/instructor/Dashboard";
import CreateCourse from "../pages/instructor/CreateCourse";
import EditCourse from "../pages/instructor/EditCourse";
import EditLesson from "../pages/instructor/EditLesson";
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Analytics from "../pages/admin/Analytics";
import ProtectedRoute from "../components/ProtectedRoute";


import About from "../pages/public/About";
import Profile from "../pages/student/Profile";
import ManageCourses from "../pages/instructor/ManageCourses";
import UploadLesson from "../pages/instructor/UploadLesson";
import AdminCourses from "../pages/public/Courses";
import NotFound from "../pages/public/NotFound";



export default function AppRoutes() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Student */}
            <Route
                path="/student/my-courses"
                element={
                    <ProtectedRoute>
                        <MyCourses />
                    </ProtectedRoute>
                }
            />

            {/* Instructor */}
            <Route
                path="/instructor/dashboard"
                element={
                    <ProtectedRoute>
                        <InstructorDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/instructor/create"
                element={
                    <ProtectedRoute>
                        <CreateCourse />
                    </ProtectedRoute>
                }
            />

            {/* Admin */}
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/users"
                element={
                    <ProtectedRoute>
                        <Users />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/analytics"
                element={
                    <ProtectedRoute>
                        <Analytics />
                    </ProtectedRoute>
                }
            />



            <Route path="/about" element={<About />} />

            <Route
                path="/student/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/instructor/manage"
                element={
                    <ProtectedRoute>
                        <ManageCourses />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/instructor/upload-lesson"
                element={
                    <ProtectedRoute>
                        <UploadLesson />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/instructor/edit-course/:id"
                element={
                    <ProtectedRoute>
                        <EditCourse />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/instructor/edit-lesson/:id"
                element={
                    <ProtectedRoute>
                        <EditLesson />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/courses"
                element={
                    <ProtectedRoute>
                        <AdminCourses />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}