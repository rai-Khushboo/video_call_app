import express from 'express'
import { Signup } from '../routeController/authController.js';

const router = express.Router();


router.post('/signup' , Signup)

export default router;