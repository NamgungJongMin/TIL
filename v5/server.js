// /* ----------------------------- 깐 익스프레스 가지고 왔다 ----------------------------- */
// const express = require('express');

// const app = express();
// const PORT = 9999;

// let todos = [
//   { id: 3, content: 'Javascript', completed: false },
//   { id: 2, content: 'CSS', completed: true },
//   { id: 1, content: 'HTML', completed: false },
// ];

// /* -------------------------- 루트 디렉토리의 이름이 public이다 ------------------------- */
// app.use(express.static('public'));
// /* ------------------------------- 페이로드도 설정필요 ------------------------------- */
// // 바디를 받는데 json형식으로 파싱해서 받아라
// app.use(express.json());
// /* --------------- get요청이 서버에 요청이 왔을 때 무언가를 해라. 무언가를 인수로 주면 됨
// /todos 라고 적어줘야지 암묵적인 룰 /todos/1 하면 id가 1인넘 이름은 백엔드가 지어서 알려줌.--------------- */
// // get요청으로 /todos라는 놈을 달라는 요청이 오면 콜백함수가 호출되는데 get 함수가 req,와 res를 인수로 전해주면서 호출됨.
// // GET /todos
// app.get('/todos', (req, res) => {
//   res.send(todos);
// });

// // POST /todos
// // {id, content, completed}
// // 페이로드가 request의 바디에 들어있다.
// app.post('/todos', (req, res) => {
//   console.log(req.body);

//   const newTodo = req.body;
//   todos = [newTodo, ...todos];
//   res.send(todos);
// });

// // PATCH /todos/:id
// // {completed}
// // PATCH/todos/1
// // rest api를 호출한다? 함수처럼 생각. 1을 parameter로 생각함. 그래서 id 앞에 : 쓰는게 변수라는 의미
// // 파라미터도 받아야된다.
// app.patch('/todos/:id', (req, res) => {
//   console.log(req.params);

//   const { id } = req.params;
//   const { completed } = req.body;
//   todos = todos.map(todo => (todo.id === +id ? { ...todo, completed } : todo));
//   res.send(todos);
// });

// // PATCH /todos?completed=true
// // PATCH/todos
// // {completed: true}
// app.patch('/todos', (req, res) => {
//   const { completed } = req.query;
//   console.log(JSON.parse(req.query));

//   todos = todos.map(todo => ({ ...todo, completed: JSON.parse(completed) }));
//   res.send(todos);
// });

// app.delete('/todos/:id', (req, res) => {
//   console.log(req.params);
//   const { id } = req.params;
//   todos = todos.filter(todo => todo.id !== +id);
//   res.send(todos);
// });

// // DELETE /todos?completed=true
// app.delete('/todos/:id', (req, res) => {
//   console.log(req.params);
//   const { id } = req.params;
//   todos = todos.filter(todo => todo.id !== +id);
//   res.send(todos);
// });

// /* ---------------------- listen > 서버가 요청을 듣는다.(받아들인다.) ---------------------
// 서버를 끄지않고 살려두면 무한루프를 돌면서 요청이 왔는지 안왔는지 계속 확인함
// 요 세줄이 동작하면 서버임 */
// app.listen(PORT, () => {
//   console.log(`Server listening on http://localhost: ${PORT}`);
// });

/* ---------------------------------- ---- ---------------------------------- */

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

  const { id } = req.params;
  const { completed } = req.body;

  todos = todos.map(todo => (todo.id === +id ? { ...todo, completed } : todo));
  res.send(todos);
});

// PATCH /todos
// {completed}
app.patch('/todos', (req, res) => {
  const { completed } = req.query;
  console.log(req.query);
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

// // DELETE /todos?completed=true
// app.delete('/todos/:id', (req, res) => {
//   // do something
// });

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
