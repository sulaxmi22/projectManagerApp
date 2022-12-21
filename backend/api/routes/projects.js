const router = require('express').Router();

const projectController = require('../controllers/project');

// 1. Get all projects + Ability to search by partial name
router.get('/', projectController.getProject);

// 2. Add a project
router.post('/', projectController.createProject);

// 3. Get a project by id
router.get('/:id', projectController.getProjectById);

// 4. Update a project by id
router.put('/:id', projectController.updateProjectById);

// -- Add task to project
router.put('/:id/tasks/:taskId', projectController.addTaskToProject);

// -- Add manager to project
router.put('/:id/users/:userId', projectController.addManagerToProject);


module.exports = router;