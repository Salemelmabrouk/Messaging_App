import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    verified: {
        type: Boolean,
        default: false  // Set default to false for unverified users
    },
    emailToken: {
        type: String,  // Temporary token for email verification
    }
});

export const userModel = mongoose.model('User', userSchema);
