// Require libraries and functions
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { connectDatabase } = require('./config/database');
const { errorHandler } = require('./middleware/errorHandler');
const { refreshAuthTokenCookie } = require('./config/jwt');

// Require routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const myFavListRoutes = require('./routes/myFavListRoutes');
const sportRoutes = require('./routes/sportRoutes');
const weekRoutes = require('./routes/weekRoutes');

// Activate express
const app = express();

// Use middlewares
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(express.static('static'));

// Connect to database
connectDatabase();

// Refresh auth cookie (if exists)
app.use(refreshAuthTokenCookie);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/myFav-list', myFavListRoutes);
app.use('/api/sports', sportRoutes);
app.use('/api/weeks', weekRoutes);

// Error handler middleware
app.use(errorHandler)

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})