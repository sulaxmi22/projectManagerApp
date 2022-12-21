<template>
    <form>
        <div class="form-container2">
            <div>
                <label>Task Name</label>
                <input type="text" v-model="task.name" name="name" />
            </div>
            <div>
                <label>Details</label>
                <textarea v-model="task.details" name="description"></textarea>
            </div>
            <div>
                <div class="left">
                    <label>Assigned On</label>
                    <input type="text" v-model="task.timeline.assigned" name="assigned" />

                    <label>Due On</label>
                    <input type="text" v-model="task.timeline.due" name="due" />
                </div>
            </div>
            <div>
                <label>Status</label>
                <select v-model="task.status">
                    <option>assigned</option>
                    <option>in-progress</option>
                    <option>in-review</option>
                    <option>completed</option>
                </select>
            </div>
            <div>
                <label>Priority</label>
                <select v-model="task.priority">
                    <option>low</option>
                    <option>medium</option>
                    <option>high</option>
                </select>
            </div>
            <div>
                <label>User</label>
                <select v-model="selected_user">
                    <option v-for="user in available_users" :value="user._id">
                        {{ user.name }}
                    </option>
                </select>
            </div>
            <div>
                <label>Project</label>
                <input type="text" :value="project_name" readonly />
            </div>
            <div>
                <input type="button" v-if="task._id" @click="updateTask" value="Update and Save" />
                <input type="button" v-if="task._id" @click="deleteTask(task._id)" value="Delete Task" />
                <input type="button" v-else @click="addTask" value="Add Task" />
            </div>
        </div>
    </form>
</template>

<script>

export default {
    name: 'TaskForm',
    props: {
        task: Object,
        available_users: Array,
        priorities: Array,
        statuses: Array,
        project_name: String,
    },
    data() {
        return {
            selected_priority: '',
            selected_status: '',
            selected_user: ''
        }
    },
    methods: {
        handleResponse(res) {
            if (res.ok) {
                this.success = true
            } else {
                this.error = true
            }
        },

        async addTask() {
            const data = {
                ...this.task,
                priority: this.selected_priority,
                status: this.selected_status,
                user: this.selected_user
            }
            console.log('sulax', `http://localhost:8888/tasks`);
            const res = await fetch(`http://localhost:8888/tasks`, {

                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            })
            if (res.ok) {
                const res = await fetch(`http://localhost:8888/tasks`)
                const tasksAll = await res.json()
                const lastTask = tasksAll[tasksAll.length - 1];

                const resTaskToProject = await fetch(`http://localhost:8888/projects/${data.project}/tasks/${lastTask._id}`, {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.project)
                })

                if (resTaskToProject.ok) {
                    this.$emit('closeModal')
                    this.$emit('refresh')
                } else {
                    console.log('Failed to add project');
                }
            } else {
                this.handleError()
            }
        },
        async updateTask() {

            console.log('form update', this.task._id)
            const res = await fetch(`http://localhost:8888/tasks/${this.task._id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.task)
            })
            console.log("updateddd", this.task);

            if (res.ok) {
                this.$emit('closeModal')
                this.$emit('refresh')
            } else {
                console.log('Failed to update project');
            }

            delete this.task.project
            const data = {
                ...this.task,
                priority: this.selected_priority,
                status: this.selected_status,
                user: this.selected_user
            }
            console.log('sulaxxx', JSON.stringify(data))
        },
        async deleteTask(_id) {
            console.log("delete", _id)
            const res = await fetch(`http://localhost:8888/tasks/${_id}`, {
                method: 'DELETE',
                mode: 'cors'
            })
            if (res.ok) {
                this.$emit('closeModal')
                this.$emit('refresh')
            } else {
                console.log('Failed to delete project');
            }
        }
    },
    async created() {
        this.selected_priority = this.task.priority
        this.selected_status = this.task.status
        this.selected_user = this.task.user
    }
}

</script>

<style>
.form-container2 {
    padding: 25px;
    background-color: aliceblue;
}

form {
    margin: 0px auto;
    width: 100%;
    height: auto;
    background: #FFF;
}

form label {
    font-size: 14px;
    color: #888;
    cursor: pointer;
}

form input,
form textarea,
form select {
    margin: 5px 0;
    padding: 8px;
    width: 95%;
    border: 1px solid #333;
    border-radius: 5px;
    display: block;
}

input[type="button"] {
    background: #2b2d42;
    border: 1px solid #000;
    color: #FFF;
    border-radius: 50px;
    cursor: pointer;
    font-size: 14px;
    display: inline;
    width: 33%;
    margin-right: 10px;
}

input[type="button"]:hover {
    background: #8d99ae;
    color: #111;
}
</style>