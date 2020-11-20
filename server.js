const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let todoList = [];

let originId = 1;

// GET /api/todos
app.get('/api/todos', (req, res) => {
    res.send(todoList);
});

// GET /api/todos/:id
app.get('/api/todos/:id', (req, res) => {
    const id = req.params.id;

    let thisTask = todoList.find((task) => {
        return task.id === Number(id);
    });

    res.status(200).json(
        thisTask
    );

    // example way we did in class
    // const filter = req.body.filter || [];
    // if(filter.length) {
    //     let newTask = {};
    //     filter.forEach((task) => {
    //         newTask[task] = thisTask[task];
    //     });
    //     res.status(200).send(newTask);
    // };
    // res.status(200).send(thisTask);
});

// POST /api/todos
app.post('/api/todos', (req, res) => {
    todoList.push({
        id: originId,
        task: req.body.task,
        dueDate: req.body.dueDate
    });
    originId++;
    res.status(200).json({
        message: "Task created successfully"
    });
});

// PUT /api/todos/:id
app.put('/api/todos/:id', (req, res) => {
    const id = req.params.id;

    let thisTask = todoList.find((task) => {
        return task.id === Number(id);
    });

    let taskIndex = todoList.findIndex((t) => {
        return t === thisTask;
    });

    todoList[taskIndex] = req.body;
    res.send(todoList[taskIndex]);
});

// DELETE /api/todos/:id
app.delete('/api/todos/:id', (req, res) => {
    const id = req.params.id;

    let thisTask = todoList.find((task) => {
        return task.id === Number(id);
    });

    let taskIndex = todoList.findIndex((t) => {
        return t === thisTask;
    });

    if (taskIndex > -1) {
        todoList.splice(taskIndex, 1);
    };

    res.status(200).send(todoList);
});

app.listen(3000, () => {
    console.log('Todo List API is now listening on port 3000...');
});