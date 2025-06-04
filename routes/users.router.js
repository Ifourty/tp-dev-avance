import express from 'express'
import { controllerGetUsers } from '../controllers/users.controller.js';
import { getAllUsersmiddleware } from '../middlewares/user.middleware.js';

export const userRouter = express.Router()

userRouter.route('/').get(getAllUsersmiddleware, controllerGetUsers);

//userRouter.route('/:id').get();