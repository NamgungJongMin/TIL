import render from './render.mjs';

let state = {
  todos: [], // todo 배열. 서버로부터 취득한다.
  isCheckedToggleAll: false, // 일괄 토글 모드
  editingTodoIds: [], // 편집 모드인 todo id의 배열
  currentFilterId: 'all', // 현재 선택 중인 filter id ('all'|'completed'|'active')
};

const $root = document.getElementById('root');
const filterIds = ['all', 'active', 'completed'];

const setState = newState => {
  state = { ...state, ...newState };
  render(state, filterIds, $root);
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

const toggleAllTodoCompleted = () => {
  const isCheckedToggleAll = !state.isCheckedToggleAll;
  setState({
    todos: state.todos.map(todo => ({ ...todo, completed: isCheckedToggleAll })),
    isCheckedToggleAll,
  });
};
const addTodo = content => {
  const newTodo = { id: generateNextId(), content, completed: false };
  setState({ todos: [newTodo, ...state.todos] });
};

const toggleTodoCompleted = id => {
  setState({
    todos: state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo)),
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

export {
  removeAllCompletedTodos,
  changeCurrentFilter,
  removeTodo,
  updateTodoContent,
  changeToEditMode,
  toggleAllTodoCompleted,
  addTodo,
  toggleTodoCompleted,
  fetchTodos,
  generateNextId,
  setState,
};
