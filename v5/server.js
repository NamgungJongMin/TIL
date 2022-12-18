const express = require('express');

const app = express();
const PORT = 9999;

let todos = [
  { id: 3, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: false },
];

app.use(express.static('public'));
app.use(express.json());

// GET /todos
app.get('/todos', (req, res) => {
  res.send(todos);
});

// POST /todos
// {id, content, completed}
app.post('/todos', (req, res) => {
  const newTodo = req.body;
  todos = [newTodo, ...todos];

  res.send(todos);
});

// PATCH /todos/:id
// {completed} || {content}
app.patch('/todos/:id', (req, res) => {
  // do something!
  console.log(req.body);
  const { id } = req.params;
  const { completed } = req.body;
  // console.log(req.query);
  // console.log(req.body);

  todos = todos.map(todo => (todo.id === +id ? { ...todo, completed: !completed } : todo));
  res.send(todos);
});

// PATCH / todos;
// {completed;}
app.patch('/todos', (req, res) => {
  const { completed } = req.query;
  console.log(req);
  console.log(typeof JSON.parse(completed));
  todos = todos.map(todo => ({ ...todo, completed: JSON.parse(completed) }));
  res.send(todos);
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  todos = todos.filter(todo => todo.id !== +id);
  res.send(todos);
});

// DELETE /todos?completed=true
app.delete('/todos', (req, res) => {
  // const { completed } = req.query; // {completed :true}
  // console.log(completed);
  // todos = todos.filter(todo => todo.completed === );
  res.send(todos);
  // do something
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
