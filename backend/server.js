require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

const userRoutes = require("./routes/userRoutes");

const lessonRoutes = require("./routes/lessonRoutes");

const analyticsRoutes = require("./routes/analyticsRoutes");
const notFound = require("./middleware/notFoundMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
  res.send("LMS API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enroll",enrollmentRoutes);
app.use("/api/users",userRoutes);
app.use("/api/lessons",lessonRoutes);
app.use("/api/analytics",analyticsRoutes);

app.use(notFound);
app.use(errorHandler);




app.listen(PORT, ()=>{
  console.log(`Server running on ${PORT}`);
});