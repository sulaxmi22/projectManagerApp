const userModel = require('../models/user');
const sharedService = require('../services/shared');

const createUser = async (body) => await sharedService.create(userModel, body);

// 1. Get all Users + Ability to search by isActive status
const getAllUsers = async () => await sharedService.all(userModel);

// -- Get users by status
const getUserByStatus = async (searchTerm) => {
    const matches = await userModel.find({
        isActive: { $eq: searchTerm },
    });
    return matches;
};

// 2. Get a User by id
const getUserById = async (id) => await sharedService.get(userModel, id);

// 3. Update a User by id
const updateUser = async (id, body) => await sharedService.update(userModel, id, body);


module.exports = {
    createUser,
    getAllUsers,
    getUserByStatus,
    getUserById,
    updateUser,
};


