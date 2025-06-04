import { User } from "../models/user.model.js";
import { APIFeatures } from "../utils/apiFeatures.js";
import { connectToMongoDB } from "../utils/connectToMongoDB.js";

export function getUsersData(query, callback) {
    connectToMongoDB(async () => {
        const features = new APIFeatures(User.find(), query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const users = await features.query;
        callback({
            success: true,
            results: users.length,
            data: users
        });
    });
}

export function getUserDataById(id, callback) {
    connectToMongoDB(() => {
        User.findById(id)
            .then((user) => {
                if (!user) {
                    callback({
                        success: false,
                        errorMessage: 'User not found'
                    });
                    return;
                }
                callback({
                    success: true,
                    data: user
                });
            })
            .catch((error) => {
                console.error('Error reading user data:', error);
                callback({
                    success: false,
                    errorMessage: error.message
                });
            });
    });
}

export function editUserData(id, body, callback) {
    connectToMongoDB(() => {
        User.findByIdAndUpdate(id, body)
            .then((user) => {
                if (!user) {
                    callback({
                        success: false,
                        errorMessage: 'User not found'
                    });
                    return;
                }
                callback({
                    success: true,
                });
            })
            .catch((error) => {
                console.error('Error updating user data:', error);
                callback({
                    success: false,
                    errorMessage: error.message
                });
            });
    });
}

export function deleteUserData(id, callback) {
    connectToMongoDB(() => {
        User.findByIdAndDelete(id)
            .then((user) => {
                if (!user) {
                    callback({
                        success: false,
                        errorMessage: 'User not found'
                    });
                    return;
                }
                callback({
                    success: true,
                    message: 'User deleted successfully'
                });
            })
            .catch((error) => {
                console.error('Error deleting user data:', error);
                callback({
                    success: false,
                    errorMessage: error.message
                });
            });
    });
}
