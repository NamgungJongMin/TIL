const $root = document.getElementById('root');
const filter = ['all', 'active', 'completed'];

let state = {
  todos: [],
  editingTodoIds: Number(),
  stateFilter: 'all',
};

const render = state => {
  console.log('state', state);
  console.log('ddd');

  const { todos, editingTodoIds, stateFilter } = state;
  const filteredTodos = todos.filter(({ completed }) =>
    stateFilter === 'completed' ? completed : stateFilter === 'active' ? !completed : true
  );
  const activeLength = todos.filter(todo => todo.completed === false).length;
  const countCompletedTodos = todos.filter(todo => todo.completed).length;

  const domString = `
  <section class="todo-app">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" autofocus />
      </header>

      <section class="main ${todos.length === 0 ? 'hidden' : ''}">
        <input type="checkbox" id="toggle-all" class="toggle-all" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">

        ${filteredTodos
          .map(
            ({ id, content, completed }) => `
        <li data-id="${id}" class="${editingTodoIds === id ? 'editing' : ''}">
          <div class="view">
            <input type="checkbox" class="toggle" ${completed ? 'checked' : ''} />
            <label>${content}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${content}" />
        </li>`
          )
          .join('')}
        </ul>
      </section>

      <footer class="footer ${todos.length === 0 ? 'hidden' : ''}">
        <span class="todo-count">${activeLength} item${activeLength > 1 ? 's' : ''} left</span>
        <ul class="filters">
          ${filter
            .map(
              filterId => `
          <li>
            <a id="${filterId}" class="${filterId === stateFilter ? 'selected' : ''}" href="javascript:void(0);">
              <!-- text-transform: capitalize; -->
              ${filterId[0].toUpperCase() + filterId.slice(1)}
            </a>
          </li>`
            )
            .join('')}
        </ul>
        <!-- completed 상태인 todo가 없으면 hidden 클래스를 추가해 비표시한다. -->
        <button class="clear-completed ${countCompletedTodos === 0 ? 'hidden' : ''}">
          Clear completed
        </button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
    </footer>`;

  $root.innerHTML = domString;
};

// ------------------------------------------------------
// Mutator function

const setState = newState => {
  state = { ...state, ...newState };
  render(state);
};

const fetchTodos = () => {
  setState({
    todos: [
      { id: 3, content: 'Javascript', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'HTML', completed: false },
    ],
  });
};

const generateNextId = () => Math.max(...state.todos.map(todo => todo.id), 0) + 1;

const addTodo = content => {
  const newState = { id: generateNextId(), content, completed: false };
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
  setState({ editingTodoIds: +id }); // 일반 모드 => 편집 모드
};
// 질문
const updateTodoContent = (id, editedContent) => {
  setState({
    todos: state.todos.map(todo => (todo.id === +id ? { ...todo, content: editedContent } : todo)),
    editingTodoIds: Number(),
  });
};

const removeAllCompletedTodos = () => {
  setState({ todos: state.todos.filter(({ completed }) => completed === false) });
};
// ------------------------------------------------------
// Eventhandler
window.addEventListener('DOMContentLoaded', fetchTodos);

$root.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 299) return;
  if (e.key !== 'Enter' || !e.target.matches('.new-todo')) return;

  const content = e.target.value.trim();
  if (content) addTodo(content);
  e.target.value = '';
});

$root.addEventListener('change', e => {
  if (!e.target.matches('.toggle')) return;
  toggleTodoCompleted(e.target.closest('li').dataset.id);
});

$root.addEventListener('click', e => {
  if (!e.target.matches('.destroy')) return;
  removeTodo(e.target.closest('li').dataset.id);
});

$root.addEventListener('click', e => {
  if (!e.target.matches('.filters > li > a') || e.target.matches('.selected')) return;

  changeTodoFilters(e.target.id);
});

$root.addEventListener('click', e => {
  if (!e.target.matches('.toggle-all')) return;

  if (state.todos.filter(({ completed }) => completed === true).length === state.todos.length) toggleAllTodoActive();
  else toggleAllTodoCompleted();
});

$root.addEventListener('dblclick', e => {
  if (!e.target.matches('.view > label')) return;
  changeToEditMode(e.target.closest('li').dataset.id);
});

$root.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.classList.contains('edit')) return;

  updateTodoContent(e.target.closest('li').dataset.id, e.target.value);
});

$root.addEventListener('click', e => {
  if (!e.target.matches('.clear-completed')) return;

  removeAllCompletedTodos();
});
