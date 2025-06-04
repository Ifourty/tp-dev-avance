import { checkRole } from "../services/auth.service.js";

export function getUsersCheckRoleMiddleware(req, res, next) {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (token) {
        if (checkRole(['admin', 'moderator'], token)) {
            next();
            return;
        }
    }
    res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to access this resource'
    });
}

export function editUserCheckRoleMiddleware(req, res, next) {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (token) {
        if (checkRole(['admin'], token)) {
            next();
            return;
        }
    }
    res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to edit this user'
    });
}

export function deleteUserCheckRoleMiddleware(req, res, next) {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (token) {
        if (checkRole(['admin'], token)) {
            next();
            return;
        }
    }
    res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to delete this user'
    });
}