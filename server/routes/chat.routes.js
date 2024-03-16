import express from 'express';
import chatController from '../controllers/chat.controller.js';
import verifyToken from '../middleware/Auth.js';

const router = express.Router();

// Route to handle posting a new chat message
router.get('/:id',verifyToken, chatController.getMessages);
router.post('/send/:id',verifyToken, chatController.sendMessage);



export default router;
