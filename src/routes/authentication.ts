import express from 'express';
const router = express.Router();
import { registerController } from '../controller/authenticationController/userAuthentication';
import { login } from '../controller/authenticationController/login';

// Public Routes
router.post('/register', registerController);
router.post('/login',login);


export default router;
