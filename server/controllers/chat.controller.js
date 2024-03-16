import Message from "../models/chat.model.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

class ChatController {
    sendMessage = async (req, res) => {
        try {
          const { message } = req.body;
          const { user: recipientId } = req.params; // Assuming 'user' represents the recipient ID
          const senderId = req.user._id;
      
          // Create a new chat message with sender and recipient IDs
          const newMessage = new Message({
            sender: senderId,
            recipient: recipientId,
            message,
          });
      
          // Save the new message
          await newMessage.save();
      
          // Find or create the conversation between the users
          let conversation = await Conversation.findOne({
            users: { $all: [senderId, recipientId] },
          });
      
          // If conversation doesn't exist, create a new one
          if (!conversation) {
            conversation = new Conversation({
              users: [senderId, recipientId], // Include the sender and recipient in the conversation
             
            });
          } else {
            conversation.messages.push(newMessage._id); // Add the new message to the existing conversation
          }
      
          // Save the conversation
          await conversation.save();
      
          return res.status(201).json({ message: "Message sent successfully" });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      };
      
  getMessages = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user._id;

      // Find the conversation based on the provided id and userId
      const conversation = await Conversation.findOne({
        users: { $all: [userId, id] },
      }).populate("messages");

      // If conversation doesn't exist or user is not part of the conversation, return 404 Not Found
      if (!conversation) {
        return res.status(200).json([]);
      }

      // Return the messages associated with the conversation
      return res.status(200).json(conversation.messages);
    } catch (error) {

      console.error("error in server" , error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default new ChatController();