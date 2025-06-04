import express from 'express'
import { controllerSignUp, controllerLogin } from '../controllers/auth.controller.js'
import { signUpMiddleware } from '../middlewares/auth.middleware.js';

export const authRouter = express.Router()

authRouter.route('/signup').post(signUpMiddleware, controllerSignUp);
authRouter.route('/login').post(controllerLogin);

