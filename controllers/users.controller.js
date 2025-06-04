import { getUsersData } from "../services/users.service.js";

export function controllerGetUsers(req, res) {
    getUsersData(req.query, (usersDataObject) => {
        if (!usersDataObject.success) {
            res.status(500).json({
                status: 'fail',
                message: usersDataObject.errorMessage
            });
            return;
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Users retrieved successfully',
                data: {
                    users: usersDataObject.data
                }
            });
        }
    });
}