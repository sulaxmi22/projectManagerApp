const router = require('express').Router();

const userController = require('../controllers/user'); 

// 1. Get all Users + Ability to search by isActive status
router.get('/', userController.getUser);

// 2. Get a User by id
router.get('/:id', userController.getUserById);

// 3. Update a User by id
router.put('/:id', userController.updateUserById);

// -- Create a new user
router.post('/', userController.createUser);


module.exports = router;