require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes/index');
const mediaRoutes = require('./routes/instructor-routes/media-routes');
const instructorCourseRoutes = require('./routes/instructor-routes/course-routes');
const studentViewCourseRoutes = require('./routes/student-routes/course-routes');
const studentViewOrderRoutes = require('./routes/student-routes/order-routes');
const studentCoursesRoutes = require('./routes/student-routes/student-courses-routes');
const studentCourseProgressRoutes = require('./routes/student-routes/course-progress-routes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Add multiple allowed origins (for development and production)
const allowedOrigins = [
  process.env.CLIENT_URL, // For development (e.g., http://localhost:5173)
  'https://learn-bqln.onrender.com', // For production (hosted frontend)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., mobile apps, curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

//database connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('mongodb is connected'))
  .catch((e) => console.log(e));

//routes configuration
app.use('/auth', authRoutes);
app.use('/media', mediaRoutes);
app.use('/instructor/course', instructorCourseRoutes);
app.use('/student/course', studentViewCourseRoutes);
app.use('/student/order', studentViewOrderRoutes);
app.use('/student/courses-bought', studentCoursesRoutes);
app.use('/student/course-progress', studentCourseProgressRoutes);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
  });
});

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
