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
