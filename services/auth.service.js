import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { connectToMongoDB } from "../utils/connectToMongoDB.js";

export function signUp(body, callback) {
    connectToMongoDB(() => {
        const user = new User({
            ...body
        })
        user.password = cryptPassword(user.password);
        user.save()
            .then(() => {
                callback({
                    success: true,
                    message: 'User signed up successfully'
                });
            })
            .catch((error) => {
                console.error('Error signing up user:', error);
                callback({
                    success: false,
                    errorMessage: error.message
                });
            });

    });
}

function cryptPassword(password) {
    const newPassword = bcrypt.hashSync(password, 10);
    return newPassword;
}