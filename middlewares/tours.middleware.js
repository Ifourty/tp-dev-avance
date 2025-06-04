export function getTourCheckRoleMiddleware(req, res, next) {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (token) {
        if (checkRole(['admin', 'moderator', 'user'], token)) {
            next();
            return;
        }
    }
    res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to access this resource'
    });
}

export function createTourCheckRoleMiddleware(req, res, next) {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (token) {
        if (checkRole(['admin', 'moderator'], token)) {
            next();
            return;
        }
    }
    res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to create a tour'
    });
}

export function editTourCheckRoleMiddleware(req, res, next) {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (token) {
        if (checkRole(['admin', 'moderator'], token)) {
            next();
            return;
        }
    }
    res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to edit this tour'
    });
}

export function deleteTourCheckRoleMiddleware(req, res, next) {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (token) {
        if (checkRole(['admin'], token)) {
            next();
            return;
        }
    }
    res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to delete this tour'
    });
}