const projectModel = require('../models/project');
const taskModel = require('../models/task');

const sharedService = require('../services/shared');
const taskService = require('../services/task');
const userService = require('../services/user');

// 1. Get all projects + Ability to search by partial name
const getAllProjects = async () => await sharedService.all(projectModel);

// -- Get projects by name / partial name
const getProjectByName = async (searchTerm) => {
    const matches = await projectModel.find({
        name: { $regex: searchTerm, $options: 'i' },
    });
    return matches;
};

// 2. Add a project
const createProject = async (body) => await sharedService.create(projectModel, body);

// 3. Get a project by id
const getProjectById = async (id) => await sharedService.get(projectModel, id);

// 4. Update a project by id
const updateProject = async (id, body) => await sharedService.update(projectModel, id, body);

// -- Add tasks to project
const addTaskToProject = async (id, taskId) => {
    const task = await taskService.getTaskById(taskId);
    const updated = await projectModel.findByIdAndUpdate(
        id,
        {
            $addToSet: { tasks: task._id },
        },
        { 
            returnDocument: 'after' 
        }
    );
    return updated;
};

// -- Remove task from project after the task is deleted
const removeTaskFromProject = async (taskId) => {
    await taskService.deleteTaskById(taskId);
    const projectToRemoveTask = await projectModel.findOne({
        tasks: { $eq: taskId }
    });
    const projectId = `${projectToRemoveTask._id}`;
    console.log(projectId);

    const updated = await projectModel.findByIdAndUpdate(
        projectId,
        {
            $pull: { tasks: taskId },
        },
        { 
            returnDocument: 'after' 
        }
    );
    return updated;
};

// -- Add manager to project
const addManagerToProject = async (id, userId) => {
    const user = await userService.getUserById(userId);
    const updated = await projectModel.findByIdAndUpdate(
        id,
        {
            $addToSet: { manager: user._id },
        },
        { 
            returnDocument: 'after' 
        }
    );
    return updated;
};


module.exports = {
    getAllProjects,
    getProjectByName,
    createProject,
    getProjectById,
    updateProject,
    addTaskToProject,
    addManagerToProject,
    removeTaskFromProject,
};


