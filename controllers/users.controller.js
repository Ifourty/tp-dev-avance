import { deleteUserData, editUserData, getUserDataById, getUsersData } from "../services/users.service.js";

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

export function controllerGetUserById(req, res) {
    const id = req.params.id;
    getUserDataById(id, (userDataObject) => {
        if (!userDataObject.success) {
            res.status(500).json({
                status: 'fail',
                message: userDataObject.errorMessage
            });
            return;
        } else {
            res.status(200).json({
                status: 'success',
                message: `User with id ${id} retrieved successfully`,
                data: {
                    user: userDataObject.data
                }
            });
        }
    });
}

export function controllerEditUser(req, res) {
    const id = req.params.id;
    editUserData(id, req.body, (editUserDataObject) => {
        if (!editUserDataObject.success) {
            res.status(500).json({
                status: 'fail',
                message: editUserDataObject.errorMessage
            });
            return;
        } else {
            res.status(200).json({
                status: 'success',
                message: `User with id ${id} edited successfully`,
                data: {
                    user: editUserDataObject.data
                }
            });
        }
    });
}

export function controllerDeleteUser(req, res) {
    const id = req.params.id;
    deleteUserData(id, (deleteUserDataObject) => {
        if (!deleteUserDataObject.success) {
            res.status(500).json({
                status: 'fail',
                message: deleteUserDataObject.errorMessage
            });
            return;
        } else {
            res.status(200).json({
                status: 'success',
                message: `User with id ${id} deleted successfully`
            });
        }
    });
}