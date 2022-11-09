$todoList = document.querySelector('.todo-list');
$newTodo = document.querySelector('.new-todo');
$main = document.querySelector('.main');
$footer = document.querySelector('.footer');
$todoCount = document.querySelector('.todo-count');
$clearCompleted = document.querySelector('.clear-completed');
$toggle = document.querySelector('.toggle');

let state = {
  todos: [],
  stateFilter: 'all',
};

const render = () => {
  console.log(state);

  const { todos } = state;

  $todoList.innerHTML = todos
    .map(
      ({ id, content, completed }) => `<li data-id="${id}">
    <div class="view">
      <input type="checkbox" ${completed ? 'checked' : ''} class="toggle"/>
      <label>${content}</label>
      <button class="destroy"></button>
    </div>  
  </li>`
    )
    .join('');

  [$main, $footer].map(el => el.classList.toggle('hidden', todos.length === 0));

  const activeLength = todos.filter(todo => todo.completed === false).length;

  $todoCount.textContent = `${activeLength} item${todos.length > 1 ? 's' : ''} left`;

  $clearCompleted.classList.toggle('hidden', activeLength < 1);
};

const setState = newState => {
  state = { ...state, ...newState };
  render();
};

const fetchTodos = () => {
  //초기값을 render하는 함수
  setState({
    todos: [
      { id: 3, content: 'Javascript', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'HTML', completed: false },
    ],
  });
};

const toggleTodoCompleted = id => {
  setState({
    todos: state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo)),
  });
};

const removeTodo = id => {
  setState({
    todos: state.todos.filter(todo => todo.id !== +id),
  });
};

window.addEventListener('DOMContentLoaded', fetchTodos);

$newTodo.addEventListener('keydown', e => {
  const newTodo = { id: 4, content: e.target.value, completed: false };
  if (e.isComposing || e.keyCode === 299) return;
  if (e.key !== 'Enter' || $newTodo.value.trim() === '') return;

  setState({ todos: [newTodo, ...state.todos] });
  e.target.value = '';
});

$todoList.addEventListener('change', e => {
  if (!e.target.classList.contains('toggle')) return;
  toggleTodoCompleted(e.target.closest('li').dataset.id);
});

$todoList.addEventListener('click', e => {
  if (!e.target.classList.contains('destroy')) return;
  removeTodo(e.target.closest('li').dataset.id);
});
