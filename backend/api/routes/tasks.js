const router = require('express').Router();

const taskController = require('../controllers/task');

// 1. Add a Task
router.post('/', taskController.createTask);

// 2. Get a Task by id
router.get('/:id', taskController.getTaskById);

// -- Get all tasks
router.get('/', taskController.getAllTasks);

// 3. Update a Task by id
router.put('/:id', taskController.updateTaskById);

// 4. Delete a Task by id
router.delete('/:id', taskController.deleteTaskById);

// -- Add user to task
router.put('/:id/users/:userId', taskController.addUserToTask)

// GET /tasks/priorities
router.get('/priorities', taskController.getTaskPriorities);

// GET /tasks/statuses
router.get('/statuses', taskController.getTaskStatuses);


module.exports = router;