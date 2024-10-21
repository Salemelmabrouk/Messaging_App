import express from 'express'
import { signIn, signUp,verifyEmail } from './user.controller.js'


const userRouter = express.Router()

userRouter.post("/signup", signUp)
userRouter.post("/signin", signIn)
userRouter.get("/verify-email", verifyEmail);

export default userRouter