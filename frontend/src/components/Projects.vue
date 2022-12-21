<template>
    <div class="project-list-container">
        <div v-for="project in projects" class="project-block">
            <div class="project-card">
                <div class="content">
                    <span class="title">{{ project.name }}</span>
                    <p class="text">
                        <span class="heading">Description</span>
                        {{ project.description }}
                    </p>
                    <p class="text">
                        <span class="heading">Repository</span>
                        {{ project.repository }}
                    </p>
                </div>
                <div class="project-btn-container">
                    <RouterLink :to="`/projects/${project._id}`" class="btn">Project Details</RouterLink>
                    <button class="btn" @click="loadProject(project)">Edit Project</button>
                </div>
            </div>
        </div>
    </div>

    <Modal v-if="showModal" v-bind:project="project_data" v-bind:available_users="available_users"
        @closeModal="closeModal" @refresh="refresh" />
</template>

<script>
import Modal from './Modal.vue'
export default {
    name: 'Projects',
    components: {
        Modal
    },
    data() {
        return {
            projects: [],
            available_users: [],
            project_data: {},
            showModal: false
        }
    },
    methods: {
        async loadProject(project) {
            const res = await fetch(`http://localhost:8888/projects`)

            const body = await res.json()
            this.projects = body
            console.log('sak', body)

            // get all users who are available to be associated to the project
            console.log('project', this.projects)
            const usersRes = await fetch(`http://localhost:8888/users`)
            const users = await usersRes.json()

            //last commented this for the edit project
            this.available_users = users.map(user => {
                return { _id: user._id, name: `${user.firstName} ${user.lastName}` }
            })

            this.project_data = project ? { ...project } : ''
            console.log(project)
            this.showModal = true
        },
        async refresh() {
            const res = await fetch(`http://localhost:8888/projects`)

            const body = await res.json()
            this.projects = body
            console.log('sak', body)
        },
        closeModal() {
            this.showModal = false
        }
    },
    async created() {
        this.refresh()
    }
}
</script>

<style>
.project-list-container {
    display: grid;
    justify-content: center;
    align-content: center;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    gap: 10px;
}

.project-block {
    margin: 10px 5px;
}

.project-card {
    background-color: darkcyan;
    border-radius: 25px;
    padding-top: 25px;
    padding-bottom: 25px;
}

.project-card .title {
    font-size: 32px;
    font-family: 'Roboto Condensed', sans-serif;
    margin-bottom: 25px;
}

.project-card .content {
    color: beige;
    min-height: 310px;
    padding: 30px 20px;
}

.project-card .heading {
    color: #a7adc5;
    text-transform: uppercase;
    display: block;
}

.project-card .text {
    font-size: 14px;
    padding-bottom: 10px;
}

.project-card .project-btn-container {
    color: #FFF;
}

.btn {
    background: black;
    border: 1px solid beige;
    color: beige;
    padding: 5px 15px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 14px;
    text-decoration: none;
}

.btn:hover {
    background: #8b691f;
    color: #FFF;
}
</style>