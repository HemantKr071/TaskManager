import express from 'express';
import { createTask,getTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';
const router = express.Router();

router.post('/create', auth(), upload.array('documents', 3), createTask);

router.get('/all', auth(), getTasks);

router.get('/:id', auth(), getTaskById);

router.put('/:id', auth(), upload.array('documents', 3), updateTask);

router.delete('/:id', auth(), deleteTask);

export default router;