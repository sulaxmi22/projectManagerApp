const taskModel = require('../models/task');
const projectModel = require('../models/project');

const sharedService = require('../services/shared');
const userService = require('../services/user');

const _canUpdateTask = async (id) => {
    const validQuiz = await taskModel.findOne({ _id: id, status: { $eq: 'assigned'}});
    if (!!validQuiz) {
        return !!validQuiz;
    }
};

// 1. Add a Task
const createTask = async (body) => await sharedService.create(taskModel, body);

// -- Get all tasks 
const getAllTasks = async (id) => {await sharedService.get(taskModel);
 const showContent = taskModel.find().populate({
        path: 'project',
        model: 'Project',
        select: ['id']
    }).populate({
        path: 'user',
        model: 'User',
        select: ['id']
    })
    return showContent;
}

// 2. Get a Task by id
const getTaskById = async (id) => await sharedService.get(taskModel, id);

// 3. Update a Task by id
const updateTaskById = async (id, body) => {
    const canUpdate = await _canUpdateTask(id);
    if (canUpdate) {
        const updated = await sharedService.update(taskModel, id, body);
        return updated;
    }
    else {
        const status = body.status;
        const updated = await taskModel.findByIdAndUpdate(
            id,
            {
                $set: { status: status },
            },
            { 
                returnDocument: 'after' 
            }
        );
        return updated;
    }
}

// 4. Delete a Task by id
const deleteTaskById = async (id, body) => await sharedService.remove(taskModel, id);

// -- Add User to Task
const addUserToTask = async (id, userId) => {
    const user = await userService.getUserById(userId);
    const updated = await taskModel.findByIdAndUpdate(
        id,
        {
            $addToSet: { user: user._id },
        },
        { 
            returnDocument: 'after' 
        }
    )
    return updated;
};

const getTaskPriorities = () => taskModel.schema.path('priority').enumValues;

const getTaskStatuses = () => taskModel.schema.path('status').enumValues;

module.exports = {
    createTask,
    getTaskById,
    updateTaskById,
    deleteTaskById,
    addUserToTask,
    getAllTasks,

    getTaskPriorities,
    getTaskStatuses,
}