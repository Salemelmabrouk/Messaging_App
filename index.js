// src/index.js or src/app.js
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './src/modules/user/user.route.js'; // Adjust path as necessary
import messageRoutes from './src/modules/message/message.route.js'; // Adjust path as necessary
import { dbConnection } from './database/dbConnection.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log('Incoming request:', req.body);
    next();
});

// Connect to MongoDB
dbConnection();

// Use user and message routes
app.use('/users', userRoutes);
app.use('/', messageRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});