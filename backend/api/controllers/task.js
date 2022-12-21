const taskService = require('../services/task');
const taskModel = require('../models/task');

const projectService = require('../services/project');

// 1. Add a Task
const createTask = async (req, res) => {
    const { body } = req;

    try {
        const task = await taskService.createTask(body);
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

// -- Get all tasks 
const getAllTasks = async (req, res) => {
    const { params } = req;
    const id = params.id;
    try {
        const task = await taskService.getAllTasks(id);
        res.json(task);
    } catch (error) {
        res.status(500).json({error: error.toString()})
    }
};

// 2. Get a Task by id
const getTaskById = async (req, res) => {
    const { params } = req;
    const id = params.id;
    try {
        const task = await taskService.getTaskById(id);
        res.json(task);
    } catch (error) {
        res.status(500).json({error: error.toString()})
    }
};

// 3. Update a Task by id
const updateTaskById = async (req, res) => {
    const { body, params } = req;
    const id = params.id;

    try {
        const task = await taskService.updateTaskById(id, body);
        res.json(task);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

// 4. Delete a Task by id
const deleteTaskById = async (req, res) => {
    const { params } = req;
    const id = params.id;
    try {
        const task = await taskService.deleteTaskById(id);
        res.json(task);

        // calling this function allows us to delete the removed task from the project
        projectService.removeTaskFromProject(id);
    } catch (error) {
        res.status(500).json({error: error.toString()})
    }
};

// -- Add user to task
const addUserToTask = async (req, res) => {
    const { params } = req;
    const { id, userId } = params;
    try {
        const user = await taskService.addUserToTask(id, userId);
        res.json(user);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

const getTaskPriorities = (req, res) => {
    try {
        const priorities = taskService.getTaskPriorities();
        res.json(priorities);
    } catch (error) {
        console.log('sulaaaaerror')
        res.status(500).json(error);
    }
};

const getTaskStatuses = (req, res) => {
    try {
        const status = taskService.getTaskStatuses();
        res.json(status);
    } catch (error) {
        res.status(500).json(error);
    }
};


module.exports = {
    createTask,
    getTaskById,
    updateTaskById,
    deleteTaskById,
    addUserToTask,
    getAllTasks,

    getTaskPriorities,
    getTaskStatuses,
};
