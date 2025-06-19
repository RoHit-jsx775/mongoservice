import express from 'express';
const router = express.Router();
import { registerController } from '../controller/authenticationController/Register';
import { login } from '../controller/authenticationController/logincontroller';
import { logout } from '../controller/authenticationController/logoutController';
import { authMiddleware } from '../utils/authMiddleware';

// Public Routes
router.post('/register', registerController);
router.post('/login',login);
router.post('/logout',authMiddleware ,logout);



export default router;
