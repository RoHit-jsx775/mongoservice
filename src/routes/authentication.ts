import express from 'express';
const router = express.Router();
import { registerController } from '../controller/authenticationController/userAuthentication';
import { login } from '../controller/authenticationController/login';
import { logout } from '../controller/authenticationController/logout';

// Public Routes
router.post('/register', registerController);
router.post('/login',login);
router.post('/logout',logout);



export default router;
