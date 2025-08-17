const {mongoose,model} = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  text: String,
}, { timestamps: true });

const message = mongoose.model(messageSchema)
module.exports = {message}