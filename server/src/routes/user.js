import express from 'express';
import { signUp,login,getUsers,deleteUser} from '../controllers/userController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

//SignUp and SignIn
router.post('/signup', signUp);
router.post('/login', login);

// Admin's Routes
router.get('/all', auth(['admin']), getUsers);
router.delete('/:id', auth(['admin']), deleteUser);

export default router;