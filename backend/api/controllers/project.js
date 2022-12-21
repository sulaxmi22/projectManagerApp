const projectService = require('../services/project');

// 1. Get all projects + Ability to search by partial name
const getProject = async (req, res) => {
    const { query } = req;
    const name = query.name;

    try {
        if (name) {
            const matches = await projectService.getProjectByName(name);
            res.json(matches);
        } else {
            const projects = await projectService.getAllProjects();
            res.json(projects);
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

// 2. Add a project
const createProject = async (req, res) => {
    const { body } = req;
    try {
        const project = await projectService.createProject(body);
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

// 3. Get a project by id
const getProjectById = async (req, res) => {
    const { params } = req;
    const id = params.id;
    try {
        const project = await projectService.getProjectById(id);
        res.json(project);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

// 4. Update a project by id
const updateProjectById = async (req, res) => {
    const { body, params } = req;
    const id = params.id;
    try {
        const project = await projectService.updateProject(id, body);
        res.json(project);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

// -- Add task to project
const addTaskToProject = async (req, res) => {
    const { params } = req;
    const { id, taskId } = params;
    try {
        const task = await projectService.addTaskToProject(id, taskId);
        res.json(task);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

// -- Add manager to project
const addManagerToProject = async (req, res) => {
    const { params } = req;
    const { id, userId } = params;
    try {
        const user = await projectService.addManagerToProject(id, userId);
        res.json(user);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};


module.exports = {
    getProject,
    createProject,
    getProjectById,
    updateProjectById,
    addTaskToProject,
    addManagerToProject,
};
