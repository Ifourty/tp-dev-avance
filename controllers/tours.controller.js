import { createTour, deleteTourData, editTourData, getMonthlyPlan, getTourData, getToursData, getToursStats } from '../services/tours.service.js';


export async function controllerGetTours(req, res) {
    console.log(req.query);
    getToursData(req.query, (toursDataObject) => {
        if (!toursDataObject.success) {
            res.status(500).json({
                status: 'fail',
                message: toursDataObject.errorMessage
            })
            return
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Tours retrieved successfully',
                results: toursDataObject.results,
                data: {
                    tours: toursDataObject.data
                }
            })
        }
    })
}

export function controllerGetTourById(req, res) {
    var id = req.params.id
    console.log("id", id)
    getTourData(id, (tourDataObject) => {
        if (!tourDataObject.success) {
            res.status(500).json({
                status: 'fail',
                message: tourDataObject.errorMessage
            })
            return
        } else {
            res.status(200).json({
                status: 'success',
                message: `Tour with id ${id} retrieved successfully`,
                data: {
                    tour: tourDataObject.data
                }
            })
        }
    })
}

export function controllerPostTour(req, res) {
    // const isMiddlewareSuccess = middlewarePostTour(res, req, req.body)
    // if (!isMiddlewareSuccess) return
    createTour(req.body, (createTourDataObject) => {
        if (!createTourDataObject.success) {
            res.status(500).json({
                status: 'fail',
                message: createTourDataObject.errorMessage
            })
            return
        } else {
            res.status(201).json({
                status: 'success',
                message: 'Tour created successfully',
            })
        }
    })

}

export function controllerPutTourById(req, res) {
    var id = req.params.id
    editTourData(id, req.body, (editTourDataObject) => {
        if (!editTourDataObject.success) {
            res.status(500).json({
                status: 'fail',
                message: editTourDataObject.errorMessage
            })
            return
        } else {
            res.status(200).json({
                status: 'success',
                message: `Tour with id ${id} updated successfully`,
            })
        }
    })
}

export function controllerDeleteTourById(req, res) {
    var id = req.params.id
    console.log("id", id)
    deleteTourData(id, (deleteTourDataObject) => {
        if (!deleteTourDataObject.success) {
            res.status(500).json({
                status: 'fail',
                message: deleteTourDataObject.errorMessage
            })
            return
        } else {
            res.status(204).json({
                status: 'success',
                message: 'Tour with id ' + id + 'deleted successfully',
            })
        }
    })

}

export function controllerGetToursStats(req, res) {
    getToursStats((dataObject) => {
        if (!dataObject.success) {
            res.status(500).json({
                status: 'fail',
                message: dataObject.errorMessage
            })
            return
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Tours stats retrieved successfully',
                data: {
                    stats: dataObject.data
                }
            })
        }
    })
}

export function controllerMountlyPlan(req, res) {
    const year = req.params.year * 1;
    getMonthlyPlan(year, (monthlyPlanDataObject) => {
        if (!monthlyPlanDataObject.success) {
            res.status(500).json({
                status: 'fail',
                message: monthlyPlanDataObject.errorMessage
            })
            return
        } else {
            res.status(200).json({
                status: 'success',
                message: `Monthly plan for year ${year} retrieved successfully`,
                data: {
                    monthlyPlan: monthlyPlanDataObject.data
                }
            })
        }
    });
}

export function aliasTopTours(req, res, next) {
    console.log(req.url);
    req.query.limit = '5';
    req.query.sort = 'price,ratingsAverage';
    req.query.fields = 'name,price,ratingsAverage,difficulty';
    console.log(req.query);

    next();
};
