// TASK MANAGER APP
//1. start the server - that line we added in package.json 'start'
//2. require in dependencies
const cors = require('cors');
const express = require('express');

const mongoose = require('mongoose');
const { username, password, dbName } = require('./config.json');

//3. creates express application, all express functionality in 1 variable
const app = express();

//4. port for server to run on, any port
const port = 8888;

//5. TODO: require in our routes resource
const projects = require('./api/routes/projects');
const tasks = require('./api/routes/tasks');
const users = require('./api/routes/users');

//6. for cors middleware
app.use(cors());

//7. allows express to parse JSON bodies, parse POST PUT bodies in express - improve readability
app.use(express.json());

//8. TODO: add resource route to express application
app.use('/projects', projects);
app.use('/tasks', tasks);
app.use('/users', users);

//9. start server
app.listen(port, () => {
    console.log(`server is listening ${port}`);
})

const mongoURL = `mongodb+srv://${username}:${password}@cluster0.o8yoc2v.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(mongoURL, () => {
    console.log('Connected to Mongo');
});

