import express from 'express'
import { aliasTopTours, controllerDeleteTourById, controllerGetToursStats, controllerGetTourById, controllerGetTours, controllerPostTour, controllerPutTourById, controllerMountlyPlan } from '../controllers/tours.controller.js';

export const toursRouter = express.Router()

toursRouter.route('/tours').get(controllerGetTours).post(controllerPostTour);
toursRouter.route('/top-5-cheap').get(aliasTopTours, controllerGetTours)
toursRouter.route('/tours/:id').get(controllerGetTourById).put(controllerPutTourById).delete(controllerDeleteTourById);
toursRouter.route('/tours-stats').get(controllerGetToursStats);
toursRouter.route('/monthly-plan/:year').get(controllerMountlyPlan);


// routerv1.route('/mongotest').get(tryConnection);

