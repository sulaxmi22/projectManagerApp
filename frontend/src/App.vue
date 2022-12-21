<template>
    <div class="container">
        <h1>Project & Task Management App</h1>

        <RouterView />

        <h3>⦿ Projects</h3>
        <h4>✓ Display All Projects</h4>
        <h4>✓ Display Project By ID (Click on 'Project Details')</h4>
        <h4>✓ Edit A Project (Click on 'Edit Project')</h4>

        <h3>⦿ Tasks</h3>
        <h4>✓ Display All Tasks associated to Project (Click on 'Show Tasks')</h4>
        <h4>✓ Add a new Task (Click on 'Add New Task')</h4>
        <h4>✓ Edit a Task  (Click on 'Update and Save') </h4>
        <h4>(*** Note: For non-assigned tasks, you ONLY edit 'Status' </h4>
        <h4>✓ Delete a Task  (Click on 'Delete Task') </h4>

    </div>
</template>

<script>
export default {
    name: 'App',
}
</script>

<style>
body {
    font-family: 'Open Sans', sans-serif;
    background: #212332;
    color: #FFF;
}

h1 {
    text-transform: uppercase;
    margin: 25px 5px;
}
h4 {
    text-transform: uppercase;
    margin: 0px 5px;
    text-align: left;
}
h3 {
    text-transform: uppercase;
    padding-top: 10px;
    text-align: left;
}

.container {
    color: darkcyan;
    background: black;
    padding-top: 20px;
    padding-bottom: 40px;
    text-align: center;
}
</style>
