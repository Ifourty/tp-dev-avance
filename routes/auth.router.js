import express from 'express'
import { controllerSignUp } from '../controllers/auth.controller.js'

export const authRouter = express.Router()

authRouter.route('/signup').post(controllerSignUp);

