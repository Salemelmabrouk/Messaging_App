import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    messageText: {
        type: String,
        required: true
      },
      receivedID: {
        type: String,
        required: true
      },
  
    user: {type: mongoose.SchemaTypes.ObjectId , ref: 'user'}


})

export const msgModel = mongoose.model("message", messageSchema)