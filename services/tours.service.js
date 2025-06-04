import mongoose from "mongoose";
import { Tour } from "../models/tour.model.js";
import { APIFeatures } from "../utils/apiFeatures.js";
import { connectToMongoDB } from "../utils/connectToMongoDB.js";

export function getToursData(query, callback) {
    console.log("Connecting to MongoDB...");
    connectToMongoDB(async () => {
        try {
            const features = new APIFeatures(Tour.find(), query)
                .filter()
                .sort()
                .limitFields()
                .paginate();

            const tours = await features.query;
            callback({
                success: true,
                results: tours.length,
                data: tours
            });
        } catch (error) {
            console.error('Error reading tours data:', error);
            callback({
                success: false,
                errorMessage: error.message
            });
        }
    });
}


export function createTour(body, callback) {
    connectToMongoDB(() => {
        const tour = new Tour({
            ...body
        })
        tour.save()
            .then(() => {
                callback({
                    success: true,
                    message: 'Tour created successfully'
                });
            })
            .catch((error) => {
                console.error('Error creating tour:', error);
                callback({
                    success: false,
                    errorMessage: error.message
                });
            });
    });
}

export function getTourData(id, callback) {
    connectToMongoDB(() => {
        try {
            const objectId = new mongoose.Types.ObjectId(id);
            mongoose.connection.collection('tours').findOne({ _id: objectId }).then((tour) => {
                if (!tour) {
                    callback({
                        success: false,
                        errorMessage: `Tour with id ${id} not found`
                    });
                } else {
                    callback({
                        success: true,
                        data: tour
                    });
                }
            });
        } catch (error) {
            console.error('Error reading tours data:', error);
            callback({
                success: false,
                errorMessage: error.message
            });
        }
    })
}

export function editTourData(id, tourData, callback) {
    connectToMongoDB(() => {
        try {
            const objectId = new mongoose.Types.ObjectId(id);
            mongoose.connection.collection('tours').updateOne({ _id: objectId }, { $set: tourData }).then((result) => {
                if (result.matchedCount === 0) {
                    callback({
                        success: false,
                        errorMessage: `Tour with id ${id} not found`
                    });
                } else {
                    callback({
                        success: true,
                        message: 'Tour updated successfully'
                    });
                }
            });
        } catch (error) {
            console.error('Error updating tours data:', error);
            callback({
                success: false,
                errorMessage: error.message
            });
        }
    })
}

export function deleteTourData(id, callback) {
    connectToMongoDB(() => {
        try {
            const objectId = new mongoose.Types.ObjectId(id);
            mongoose.connection.collection('tours').deleteOne({ _id: objectId }).then((result) => {
                if (result.deletedCount === 0) {
                    callback({
                        success: false,
                        errorMessage: `Tour with id ${id} not found`
                    });
                } else {
                    callback({
                        success: true,
                        message: 'Tour deleted successfully'
                    });
                }
            });
        } catch (error) {
            console.error('Error deleting tours data:', error);
            callback({
                success: false,
                errorMessage: error.message
            });
        }
    })
}

export async function getToursStats(callback) {
    connectToMongoDB(async () => {
        try {
            const stats = await Tour.aggregate([

                {
                    $match: { ratingsAverage: { $gt: 4.5 } }
                },
                {
                    $group: {
                        _id: '$difficulty',
                        avgRating: { $avg: '$ratingsAverage' },
                        numRatings: { $sum: '$ratingsQuantity' },
                        minPrice: { $min: '$price' },
                        maxPrice: { $max: '$price' },
                        avgPrice: { $avg: '$price' }
                    }
                }

            ])
            callback({
                success: true,
                data: stats
            });
        }
        catch (err) {
            console.error('Error getting tours stats:', err);
            callback({
                success: false,
                errorMessage: err.message
            });
        }
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        callback({
            success: false,
            errorMessage: 'Error connecting to MongoDB'
        });
    });

}

export async function getMonthlyPlan(year, callback) {
    connectToMongoDB(async () => {
        try {
            const plan = await Tour.aggregate([
                {
                    $unwind: '$startDates'
                },
                {
                    $match: {
                        startDates: {
                            $gte: new Date(`${year}-01-01`),
                            $lte: new Date(`${year}-12-31`)
                        }
                    }
                },
                {
                    $group: {
                        _id: { $month: '$startDates' },
                        numToursStarts: { $sum: 1 },
                        tours: { $push: '$name' }
                    }
                },
                {
                    $addFields: { month: '$_id' }
                },
                {
                    $project: {
                        _id: 0
                    }
                },
                {
                    $sort: { numToursStarts: -1 }
                }
            ]);

            callback({
                success: true,
                data: plan
            });
        } catch (error) {
            console.error('Error getting monthly plan:', error);
            callback({
                success: false,
                errorMessage: error.message
            });
        }
    });
}