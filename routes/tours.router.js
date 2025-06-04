import express from 'express'
import { aliasTopTours, controllerDeleteTourById, controllerGetToursStats, controllerGetTourById, controllerGetTours, controllerPostTour, controllerPutTourById, controllerMountlyPlan } from '../controllers/tours.controller.js';
import { createTourCheckRoleMiddleware, deleteTourCheckRoleMiddleware, editTourCheckRoleMiddleware } from '../middlewares/tours.middleware.js';
import { isUserLoginMiddleware } from '../middlewares/auth.middleware.js';

export const toursRouter = express.Router()

toursRouter.route('/tours').get(isUserLoginMiddleware, controllerGetTours)
    .post(createTourCheckRoleMiddleware, controllerPostTour);
toursRouter.route('/top-5-cheap').get(isUserLoginMiddleware, aliasTopTours, controllerGetTours)
toursRouter.route('/tours/:id').get(isUserLoginMiddleware, controllerGetTourById)
    .put(editTourCheckRoleMiddleware, controllerPutTourById)
    .delete(deleteTourCheckRoleMiddleware, controllerDeleteTourById);
toursRouter.route('/tours-stats').get(isUserLoginMiddleware, controllerGetToursStats);
toursRouter.route('/monthly-plan/:year').get(isUserLoginMiddleware, controllerMountlyPlan);


// routerv1.route('/mongotest').get(tryConnection);

