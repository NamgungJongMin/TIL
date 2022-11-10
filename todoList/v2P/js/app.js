const $todoList = document.querySelector('.todo-list');
const $newTodo = document.querySelector('.new-todo');
const $main = document.querySelector('.main');
const $footer = document.querySelector('.footer');
const $todoCount = document.querySelector('.todo-count');
const $clearCompleted = document.querySelector('.clear-completed');
const $filters = document.querySelector('.filters');
const $filterItems = $filters.querySelectorAll('a');
const $toggleAll = document.querySelector('#toggle-all');

let state = {
  todos: [],
  editingTodoIds: [],
  stateFilter: 'all',
};

const render = () => {
  console.log(state);

  const { todos, editingTodoIds, stateFilter } = state;

  const _todos = todos.filter(({ completed }) =>
    stateFilter === 'completed' ? completed : stateFilter === 'active' ? !completed : true
  );

  $todoList.innerHTML = _todos
    .map(
      ({ id, content, completed }) =>
        `<li data-id="${id}" class="${editingTodoIds.includes(id) ? 'editing' : ''}">
      <div class="view">
        <input type="checkbox" ${completed ? 'checked' : ''}   class="toggle"/>
        <label>${content}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${content}" />
      </li>`
    )
    .join('');

  [$main, $footer].map(el => el.classList.toggle('hidden', todos.length === 0));

  const activeLength = todos.filter(todo => todo.completed === false).length;

  $todoCount.textContent = `${activeLength} item${todos.length > 1 ? 's' : ''} left`;

  $clearCompleted.classList.toggle('hidden', activeLength === state.todos.length);

  $filterItems.forEach(el => el.classList.toggle('selected', el.id === state.stateFilter));
};

// ---------------------------------------------------------------------------------
// State Mutator

const setState = newState => {
  state = { ...state, ...newState };
  render();
};

const fetchTodos = () => {
  // 초기값을 render하는 함수
  setState({
    todos: [
      { id: 3, content: 'Javascript', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'HTML', completed: false },
    ],
  });
};

const generateNextId = () => state.todos[0].id + 1;

const addTodo = () => {
  const newState = { id: generateNextId(), content: $newTodo.value, completed: false };
  setState({ todos: [newState, ...state.todos] });
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

const changeTodoFilters = id => {
  setState({ ...state, stateFilter: id });
};

const toggleAllTodoCompleted = () => {
  setState({ todos: state.todos.map(todo => ({ ...todo, completed: true })) });
};

const toggleAllTodoActive = () => {
  setState({ todos: state.todos.map(todo => ({ ...todo, completed: false })) });
};

const changeToEditMode = id => {
  setState({ editingTodoIds: [...state.editingTodoIds, +id] }); // 일반 모드 => 편집 모드
};
// 질문
const updateTodoContent = (id, editedContent) => {
  setState({
    todos: state.todos.map(todo => (todo.id === +id ? { ...todo, content: editedContent } : todo)),
    editingTodoIds: state.editingTodoIds.filter(_id => _id !== +id),
  });
};

// -------------------------------------------------------------------------------
// Evnet Listener

window.addEventListener('DOMContentLoaded', fetchTodos);

$newTodo.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 299) return;
  if (e.key !== 'Enter' || $newTodo.value.trim() === '') return;

  addTodo();
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

$filters.addEventListener('click', e => {
  if (!e.target.matches('.filters > li > a') || e.target.matches('.selected')) return;

  changeTodoFilters(e.target.id);
});

$toggleAll.addEventListener('click', () => {
  if (state.todos.filter(({ completed }) => completed === true).length === state.todos.length) toggleAllTodoActive();
  else toggleAllTodoCompleted();
});

$todoList.addEventListener('dblclick', e => {
  if (!e.target.matches('.view > label')) return;
  changeToEditMode(e.target.closest('li').dataset.id);
});

$todoList.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.classList.contains('edit')) return;

  updateTodoContent(e.target.closest('li').dataset.id, e.target.value);
});
