import render from './render.js';

/**
 * 상태는 뷰에 영향을 주는 변화하는 데이터다.
 * 즉, 상태를 변경하면 리렌더링해 뷰를 변경한다.
 */
let state = {
  /**
   * todo 배열
   * 서버로부터 취득하는 서버 상태다.
   * @see https://tanstack.com/query/v4/docs/guides/does-this-replace-client-state
   */
  todos: [],
  /**
   * 일괄 토글 모드
   * 리렌더링 시 .toggle-all 요소도 새롭게 생성된다. 이때 checked가 false로 리셋된다.
   * 이를 방지하기 위해 랜더링 시 .toggle-all 요소에 checked 어트리뷰트를 설정한다.
   * @see https://ko.reactjs.org/docs/forms.html#controlled-components
   */
  isCheckedToggleAll: false,
  /**
   * .new-todo 요소에 입력된 문지열
   * 리렌더링 시 .new-todo 요소도 새롭게 생성된다. 이때 value가 ''로 리셋된다.
   * 이를 방지하기 위해 랜더링 시 .new-todo 요소에 value 어트리뷰트를 설정한다.
   */
  inputNewTodoValue: '',
  /**
   * 편집 모드인 todo id의 배열
   * 편집 모드인 li 요소에 editing 클래스를 설정할 때 필요하다.
   */
  editingTodoIds: [],
  /**
   * 현재 선택 중인 filter id ('all'|'completed'|'active')
   * currentFilterId 값이 변경되면 리렌더링되어야 한다.
   */
  currentFilterId: 'all',
};

const setState = newState => {
  state = { ...state, ...newState };
  render(state);
};

// private
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

const changeInputNewTodoValue = value => {
  setState({ inputNewTodoValue: value });
};

const addTodo = content => {
  const newTodo = { id: generateNextId(), content, completed: false };
  setState({ todos: [newTodo, ...state.todos], inputNewTodoValue: '' });
};

const toggleTodoCompleted = id => {
  const todos = state.todos.map(todo =>
    todo.id === +id ? { ...todo, completed: !todo.completed } : todo
  );
  // toggleTodoCompleted 함수는 change 이벤트 핸들러가 호출한다. 따라서 state.todos 배열이 빈배열이 경우는 없다.
  const [firstTodo] = todos;

  setState({
    todos,
    /**
     * 모든 todo.completed가 true 또는 false로 변경되면 isCheckedToggleAll 상태도 변경한다.
     * 변경 이전의 state.todos가 아니라 변경된 todos를 사용해야 한다.
     */
    isCheckedToggleAll: todos.every(({ completed }) => completed === firstTodo.completed)
      ? firstTodo.completed
      : state.isCheckedToggleAll,
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
  fetchTodos,
  toggleAllTodoCompleted,
  changeInputNewTodoValue,
  addTodo,
  toggleTodoCompleted,
  changeToEditMode,
  updateTodoContent,
  removeTodo,
  changeCurrentFilter,
  removeAllCompletedTodos,
};
