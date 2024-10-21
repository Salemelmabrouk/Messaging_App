import { userModel } from "../../../models/user.model.js"
import crypto from "crypto";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendMail } from "../SendMail/sendMail.js";

/**
 * find()=> []
 * findOne()=> object | null
 * findById()=> 
 */

 
 
 

export const signUp = async (req, res) => {
    const { name, email, password, age } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
        return res.json({ message: "User already exists" });
    } else {
        const hash = bcrypt.hashSync(password, 8);
        const emailToken = crypto.randomBytes(32).toString('hex');  // Generate token

        // Create the user but with verified = false
        const newUser = new userModel({
            name,
            email,
            password: hash,
            age,
            verified: false,
            emailToken  // Save email token
        });

        await newUser.save();

        // Create mail options with a verification link
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify your email',
            text: 'Please verify your email by clicking the link below:\n' +
                  `${process.env.BASE_URL}/verify-email?emailToken=${emailToken}`,
            html: `<b>Please verify your email by clicking the link below:</b><br>` +
                  `<a href="${process.env.BASE_URL}/users/verify-email?emailToken=${emailToken}">Verify Email</a>`,
        };

        // Send verification email
        await sendMail(mailOptions);

        res.json({ message: "Success, please verify your email" });
    }
};
export const signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
        if (!user.verified) {
            return res.json({ message: "Please verify your email first" });
        }

        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user._id, name: user.name }, 'mysecrectkey');
            return res.json({ message: "Login successful", token });
        } else {
            return res.json({ message: "Incorrect password" });
        }
    } else {
        return res.json({ message: "Email not found" });
    }
};

export const verifyEmail = async (req, res) => {
    const { emailToken } = req.query; // Get the emailToken from the query parameters

    // Find the user by the email token
    const user = await userModel.findOne({ emailToken });

    if (!user) {
        return res.json({ message: "Invalid or expired token" });
    }

    // Mark the user as verified and remove the token
    user.verified = true;
    user.emailToken = null; // Clear the token after verification
    await user.save();

    res.json({ message: "Email verified successfully" });
};
