import express from 'express'
import { controllerDeleteUser, controllerEditUser, controllerGetUserById, controllerGetUsers } from '../controllers/users.controller.js';
import { deleteUserCheckRoleMiddleware, editUserCheckRoleMiddleware, getUsersCheckRoleMiddleware } from '../middlewares/user.middleware.js';

export const userRouter = express.Router()

userRouter.route('/').get(getUsersCheckRoleMiddleware, controllerGetUsers);
userRouter.route('/:id').get(getUsersCheckRoleMiddleware, controllerGetUserById)
    .put(editUserCheckRoleMiddleware, controllerEditUser)
    .delete(deleteUserCheckRoleMiddleware, controllerDeleteUser);