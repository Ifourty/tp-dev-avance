import express from 'express'
import { controllerSignUp, controllerLogin } from '../controllers/auth.controller.js'
import { signUpCheckRoleMiddleware } from '../middlewares/auth.middleware.js';

export const authRouter = express.Router()

authRouter.route('/signup').post(signUpCheckRoleMiddleware, controllerSignUp);
authRouter.route('/login').post(controllerLogin);

