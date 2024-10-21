 
// src/modules/message/message.controller.js
import { msgModel } from "../../../models/message.model.js"; // Adjust path as necessary

// Function to send a message
export const sendMessage = async (req, res) => {
    const { user, messageText, receivedID } = req.body;

    // Create a new message
    const newMessage = new msgModel({
        user,
        messageText,
        receivedID,
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully", newMessage });
};

// Function to get messages by user ID
export const getMessagesByUser = async (req, res) => {
    const { userId } = req.params;

    // Find messages sent by the user
    const messages = await msgModel.find({ user: userId }).populate('user', 'name email'); // Populate user info if needed

    res.status(200).json(messages);
};