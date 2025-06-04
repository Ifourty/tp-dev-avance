import { login, signUp } from "../services/auth.service.js";

export function controllerSignUp(req, res) {
    signUp(req.body, (signUpDataObject) => {
        if (!signUpDataObject.success) {
            res.status(500).json({
                status: 'fail',
                message: signUpDataObject.errorMessage
            });
            return;
        } else {
            res.status(201).json({
                status: 'success',
                message: 'User signed up successfully',
                data: {
                    user: signUpDataObject.data
                }
            });
        }
    });
}

export function controllerLogin(req, res) {
    login(req.body, (loginDataObject) => {
        if (!loginDataObject.success) {
            res.status(401).json({
                status: 'fail',
                message: loginDataObject.errorMessage
            });
            return;
        } else {
            res.status(200).json({
                status: 'success',
                message: 'User logged in successfully',
                data: {
                    user: loginDataObject.data
                }
            });
        }
    });
}