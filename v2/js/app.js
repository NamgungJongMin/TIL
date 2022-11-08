const $toggleAll = document.querySelector('.toggle-all');
const $newTodo = document.querySelector('.new-todo');
const $todoList = document.querySelector('.todo-list');
const $main = document.querySelector('.main');
const $footer = document.querySelector('.footer');
const $todoCount = document.querySelector('.todo-count');
const $filters = document.querySelector('.filters');
const $filterItems = $filters.querySelectorAll('a');
const $clearCompleted = document.querySelector('.clear-completed');

let state = {
  todos: [], // todo 배열. 서버로부터 취득한다.
  editingTodoIds: [], // 편집 모드인 todo id의 배열
  currentFilterId: 'all', // 현재 선택중인 filter의 id ('all'|'completed'|'active')
};

const render = () => {
  console.log('[STATE]', state);

  const { todos, editingTodoIds, currentFilterId } = state;

  const _todos = todos.filter(({ completed }) =>
    currentFilterId === 'completed' ? completed : currentFilterId === 'active' ? !completed : true
  );

  // prettier-ignore
  $todoList.innerHTML = _todos.map(({id, content, completed}) => `
    <li data-id="${id}" class="${editingTodoIds.includes(id) ? 'editing' : ''}">
      <div class="view">
        <input type="checkbox" class="toggle" ${completed ? 'checked' : ''}/>
        <label>${content}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${content}" />
    </li>`).join('');

  // 할일이 없는 경우, 상단 좌측의 V 버튼과 중앙 section 요소(section.main)과 하단 footer 요소(footer.footer)를 비표시한다.
  [$main, $footer].forEach($el => $el.classList.toggle('hidden', todos.length === 0));

  // .todo-counter 요소에 active 상태인 todo의 갯수를 표시한다.
  // active 상태인 todo의 갯수
  const countActiveTodos = todos.filter(todo => !todo.completed).length;
  $todoCount.textContent = `${countActiveTodos} item${countActiveTodos > 1 ? 's' : ''} left`;

  // .filters 요소의 자식인 a 요소 중에 state.currentFilter와 일치하는 id를 갖는 a 요소에 'selected' 클래스를 추가한다.
  $filterItems.forEach($a => $a.classList.toggle('selected', $a.id === currentFilterId));

  // completed 상태의 todo가 없으면 .clear-completed 요소를 비표시한다.
  // completed 상태인 todo의 갯수
  const countCompletedTodos = todos.filter(todo => todo.completed).length;
  $clearCompleted.classList.toggle('hidden', countCompletedTodos === 0);
};

/**
 *  state handlers
 */
const setState = newState => {
  state = { ...state, ...newState };
  render();
};

const generateNextId = () => Math.max(...state.todos.map(todo => todo.id), 0) + 1;

const fetchTodos = () => {
  // TODO: fetch todos
  setState({
    todos: [
      { id: 3, content: 'Javascript', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'HTML', completed: false },
    ],
  });
};

const toggleAllTodoCompleted = completed => {
  setState({ todos: state.todos.map(todo => ({ ...todo, completed })) });
};

const addTodo = content => {
  const newTodo = { id: generateNextId(), content, completed: false };
  setState({ todos: [newTodo, ...state.todos] });
};

const toggleTodoCompleted = id => {
  setState({
    todos: state.todos.map(todo =>
      todo.id === +id ? { ...todo, completed: !todo.completed } : todo
    ),
  });
};

const changeToEditMode = id => {
  setState({ editingTodoIds: [...state.editingTodoIds, +id] }); // 일반 모드 => 편집 모드
};

const updateTodoContent = (id, content) => {
  setState({
    todos: state.todos.map(todo => (todo.id === +id ? { ...todo, content } : todo)),
    editingTodoIds: state.editingTodoIds.filter(_id => _id !== +id), // 편집 모드 => 일반 모드
  });
};

const removeTodo = id => {
  setState({ todos: state.todos.filter(todo => todo.id !== +id) });
};

const changeCurrentFilter = id => {
  setState({ currentFilterId: id });
};

const removeAllCompletedTodos = () => {
  setState({ todos: state.todos.filter(todo => !todo.completed) });
};

/**
 * Event handlers
 */
// initial rendering
window.addEventListener('DOMContentLoaded', fetchTodos);

// toggle all todo completed
$toggleAll.addEventListener('change', e => {
  toggleAllTodoCompleted(e.target.checked);
});

// add todo
$newTodo.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter') return;

  const content = e.target.value.trim();
  if (content) addTodo(content);
  e.target.value = '';
});

// toggle todo completed
$todoList.addEventListener('change', e => {
  // ! 편집 모드에서 input text에서 change 이벤트가 발생하는 경우도 있다.
  if (!e.target.classList.contains('toggle')) return;
  toggleTodoCompleted(e.target.closest('li').dataset.id);
});

// edit mode
$todoList.addEventListener('dblclick', e => {
  if (!e.target.matches('.view > label')) return;
  changeToEditMode(e.target.closest('li').dataset.id);
});

// update todo content
$todoList.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.classList.contains('edit')) return;

  updateTodoContent(e.target.closest('li').dataset.id, e.target.value);
});

// remove todo
$todoList.addEventListener('click', e => {
  if (!e.target.classList.contains('destroy')) return;
  removeTodo(e.target.closest('li').dataset.id);
});

// filter todos
$filters.addEventListener('click', e => {
  if (!e.target.matches('.filters > li > a')) return;
  changeCurrentFilter(e.target.id);
});

// remove all completed todos
$clearCompleted.addEventListener('click', removeAllCompletedTodos);
