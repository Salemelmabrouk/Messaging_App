// src/modules/message/message.routes.js
import express from 'express';
import { sendMessage, getMessagesByUser } from './message.controller.js'; // Adjust path as necessary
import auth from '../../middleware/auth.js';

const messageRoutes = express.Router();

// POST route to send a message
messageRoutes.post('/messages', auth,sendMessage);

// GET route to retrieve messages by user ID
messageRoutes.get('/messages/:userId', auth,getMessagesByUser);

export default messageRoutes;