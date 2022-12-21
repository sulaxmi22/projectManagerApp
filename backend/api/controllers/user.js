const userService = require('../services/user');

// 1. Get all Users + Ability to search by isActive status
const getUser = async (req, res) => {
    const { query } = req;
    const queryParam = query.isActive;  
   
    try {
        if (queryParam) {
            const matches = await userService.getUserByStatus(queryParam.toString());
             res.json(matches);
        } else {
            const users = await userService.getAllUsers();
                res.json(users);
        }
    } catch (error) {
        res.status(500).json({error: error.toString()})
    }
};

// 2. Get a User by id
const getUserById = async (req, res) => {
    const { params } = req;
    const id = params.id;
    try {
        const user = await userService.getUserById(id);
        res.json(user);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

// 3. Update a User by id
const updateUserById = async (req, res) => {
    const { body, params } = req;
    const id = params.id;
    try {
        const user = await userService.updateUser(id, body);
        res.json(user);
    } catch (error) {
        res.status(500).send({error: error.toString()});
    }
}

// -- Create new user
const createUser = async (req, res) => {
    const { body } = req;
    try {
        const user = await userService.createUser(body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};


module.exports = {
    getUser,
    getUserById,
    updateUserById,
    createUser,
}