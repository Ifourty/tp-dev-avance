import express from 'express'
import { controllerGetUserById, controllerGetUsers } from '../controllers/users.controller.js';
import { getUsersmiddleware } from '../middlewares/user.middleware.js';

export const userRouter = express.Router()

userRouter.route('/').get(getUsersmiddleware, controllerGetUsers);


userRouter.route('/:id').get(getUsersmiddleware, controllerGetUserById);