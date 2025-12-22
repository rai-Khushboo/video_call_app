import express from 'express';
import { Signup, Login, LogOut } from '../routeController/authController.js';
import isLogin from '../middlewares/isLogin.js';

const router = express.Router();

router.post('/login', Login);
router.post('/signup', Signup);

// here isLogin is a middleware
router.post('/logout', isLogin, LogOut);

export default router;
