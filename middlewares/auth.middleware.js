import { checkRole, verifyJWTToken } from "../services/auth.service.js";

export function signUpCheckRoleMiddleware(req, res, next) {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    switch (req.body.role) {
        case 'admin':
            if (checkRole(['admin'], token)) {
                next();
            } else {
                res.status(403).json({
                    status: 'fail',
                    message: 'You do not have permission to sign up as an admin'
                });
            }
            break;
        case 'moderator':
            if (checkRole(['admin', 'moderator'], token)) {
                next();
            } else {
                res.status(403).json({
                    status: 'fail',
                    message: 'You do not have permission to sign up as a moderator'
                });
            }
            break;
        default:
            next();
    }
}

export function isUserLoginMiddleware(req, res, next) {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (token) {
        if (verifyJWTToken(token)) {
            next();
            return;
        }
    }
    res.status(401).json({
        status: 'fail',
        message: 'You must be logged in to access this resource'
    });
}



