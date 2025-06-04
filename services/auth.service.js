import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { connectToMongoDB } from "../utils/connectToMongoDB.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

export function login(body, callback) {
    connectToMongoDB(() => {
        User.findOne({ email: body.email })
            .then((user) => {
                if (!user) {
                    callback({
                        success: false,
                        errorMessage: 'User not found'
                    });
                    return;
                }
                const isPasswordValid = bcrypt.compareSync(body.password, user.password);
                if (!isPasswordValid) {
                    callback({
                        success: false,
                        errorMessage: 'Invalid password'
                    });
                    return;
                }
                callback({
                    success: true,
                    data: {
                        id: user._id,
                        role: user.role,
                        token: generateJWTToken(user)
                    }
                });
            })
            .catch((error) => {
                console.error('Error logging in user:', error);
                callback({
                    success: false,
                    errorMessage: error.message
                });
            });
    });
}

export function checkRole(roles, token) {
    if (token === undefined || token === null) {
        return false;
    }

    console.log('Checking role for token:', token);
    const decodedToken = verifyJWTToken(token);
    if (!decodedToken) {
        return false;
    }
    const userRole = decodedToken.role;
    return roles.includes(userRole);
}

function cryptPassword(password) {
    const newPassword = bcrypt.hashSync(password, 10);
    return newPassword;
}

function generateJWTToken(user) {
    const secretKey = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        secretKey,
        { expiresIn }
    );
}

function verifyJWTToken(token) {
    const secretKey = process.env.JWT_SECRET;
    console.log('Verifying JWT token:', token);
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }
}