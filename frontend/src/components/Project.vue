<template>
    <div class="row">
        <div class="column-left">
            <ProjectForm v-if="isLoaded" v-bind:project="{ ...populated_project }"
                v-bind:available_users="available_users" />
            <button class="btn2" @click="showTasks()">Show Tasks</button>
            <div>
                <button class="btn2" @click="openTaskModal()">Add New Task</button>
                <Modal v-if="showModal" v-bind:task="add_task" v-bind:available_users="available_users"
                    v-bind:priorities="priorities" v-bind:statuses="statuses"
                    v-bind:project_name="populated_project.name" @closeModal="closeModal" @refresh="showTasks" />
            </div>
        </div>

        <div class="column-right">
            <div class="task-container">
                <div v-for="task1 in this.taskShow" class="task-block">
                    <TaskForm v-if="taskShowFlag" v-bind:task="{ ...task1 }" v-bind:available_users="available_users"
                        v-bind:priorities="priorities" v-bind:statuses="statuses"
                        v-bind:project_name="populated_project.name" v-bind:populated_project="populated_project"
                        @refresh="showTasks" />
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import ProjectForm from "./ProjectForm.vue";
import TaskForm from "./TaskForm.vue";

import Modal from "./Modal.vue";

export default {
    name: "Project",
    components: {
        ProjectForm,
        TaskForm,
        Modal,
    },
    data() {
        return {
            task: {},
            populated_project: {},

            available_users: [],
            priorities: [],
            statuses: [],
            isLoaded: false,

            add_task: {},
            showModal: false,
            taskShowFlag: false,
            taskShow: {}
        };
    },
    methods: {
        async showTasks() {
            console.log('enum', this.priorities, this.statuses)
            this.taskShowFlag = true;
            console.log("showTasks is being called");

            const taskRes = await fetch(`http://localhost:8888/tasks`);
            let result = await taskRes.json()
            const arr = [];
            result.filter((item) => {
                console.log("Project===", item.project[0]);
                if (item.project[0]._id === this.populated_project.id) {
                    arr.push(item);
                }
            });
            console.log("Result==", result);
            this.taskShow = arr;
            return this.taskShow;
        },

        openTaskModal() {
            this.add_task = { project: this.populated_project._id, timeline: {} };
            console.log(this.populated_project);
            this.showModal = true;
        },
        setData(task, project, users, priorities, statuses) {
            console.log('sakshii', priorities, statuses)
            this.populated_project = project;

            this.available_users = users.map((user) => {
                return { _id: user._id, name: `${user.firstName} ${user.lastName}` };
            });

            this.priorities = priorities;
            this.statuses = statuses;

            this.isLoaded = true;
        },
        closeModal() {
            this.showModal = false;
        },
    },
    async beforeRouteEnter(to, from, next) {
        const identifier = to.params.identifier;

        const projectRes = await fetch(`http://localhost:8888/projects/${identifier}`);
        const project = await projectRes.json();

        const taskRes = await fetch(`http://localhost:8888/tasks`);
        const task = await taskRes.json();
        console.log("this is task", task);
    
        const usersRes = await fetch(`http://localhost:8888/users/?project=${identifier}`);
        const users = await usersRes.json();

        const priorityRes = await fetch(`http://localhost:8888/tasks/priorities`);
        const priorities = await priorityRes.json();

        const statusRes = await fetch(`http://localhost:8888/tasks/statuses`);
        const statuses = await statusRes.json();

        next(function (vm) {
            return vm.setData(task, project, users, priorities, statuses);
        });
    },
};
</script>

<style>
.btn2 {
    background: lightgreen;
    border: 1px solid beige;
    padding: 5px 15px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 14px;
    text-decoration: none;
    width: 50%;
    margin-top: 20px;
    margin-bottom: 10px;

}

.btn2:hover {
    background: darkgreen;
    color: #FFF;
}

.column-left {
    float: left;
    width: 49%;
    margin-right: 1%;
}

.column-right {
    float: right;
    width: 50%;
}

.task-block {
    margin-bottom: 10px;
}

.task-card {
    background-color: #fff;
    border: 1px solid #ccc;
}

.task-card .content {
    min-height: 250px;
}

.task-card .points {
    font-size: 15px;
    font-family: "Open Sans", sans-serif;
    font-weight: bold;
    text-align: right;
    padding: 10px;
    margin: 0px;
}

.task-card .text {
    font-size: 15px;
    font-family: "Open Sans", sans-serif;
    padding: 10px;
}

.task-card .text {
    font-size: 15px;
    font-family: "Open Sans", sans-serif;
    padding: 10px 25px;
}
</style>
