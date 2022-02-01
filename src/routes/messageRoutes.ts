import express from 'express';
import {deleteMessagePrivate, deleteMessageGroup} from '../controllers/messageController';
import { protect } from '../controllers/authControllerFB';

const router = express.Router();

// routers



// delete route
router.delete('/', protect, deleteMessagePrivate)
router.delete("/", protect, deleteMessageGroup)
// exported router
export default router;
