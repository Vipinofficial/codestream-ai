import express from 'express';
import { register, login, logout,getMyProfile } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', getMyProfile);

export default router;

