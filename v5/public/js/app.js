import {
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
} from './state.js';

const $root = document.getElementById('root');

/**
 * input 요소의 focus를 설정한다.
 * input 요소에 텍스트가 존재하는 경우 텍스트 앞에 cursor가 위치한다.
 * HTMLInputElement#setSelectionRange 메서드를 사용해 텍스트의 가장 뒤로 cursor position을 재조정한다.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
 */
const setFocusTo = $inputField => {
  const { length } = $inputField.value;
  $inputField.focus();
  $inputField.setSelectionRange(length, length);
};

/**
 * Event handlers
 */
// initial rendering
window.addEventListener('DOMContentLoaded', fetchTodos);

// toggle all todo completed
$root.addEventListener('change', e => {
  if (!e.target.matches('.toggle-all')) return;
  toggleAllTodoCompleted();
});

/**
 * .new-todo 요소에 텍스트를 입력한 상태에서 리렌더링이 발생(에를 들어 completed 체크)하면
 * .new-todo 요소도 리렌더링되므로 .new-todo 요소의 텍스트와 focus가 사라진다.
 * 이를 방지하기 위해 .new-todo 요소에 입력된 텍스트를 상태로 관리한다.
 */
$root.addEventListener('input', e => {
  if (!e.target.matches('.new-todo')) return;

  changeInputNewTodoValue(e.target.value);

  /**
   * .new-todo 요소는 setState에 의해 새롭게 생성되어 렌더링되므로 focus를 잃는 문제가 발생한다.
   * .new-todo 요소에 autofocus 어트리뷰트를 설정했다. 하지만 autofocus 어트리뷰트는 페이지 로드시에만 정상적으로 동작한다.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus
   *
   * setFocusTo 함수를 사용해 새롭게 생성된 .new-todo 요소를 취득해 focus를 되살린다.
   * 이 문제의 근본적인 해결 방법은 .new-todo 요소를 리렌더링하지 않고 value 프로퍼티만 변경시키는 것이다.
   */
  setFocusTo(document.querySelector('.new-todo'));
});

// add todo
$root.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.matches('.new-todo')) return;

  const content = e.target.value.trim();
  if (content) {
    addTodo(content);
    setFocusTo(document.querySelector('.new-todo'));
  }
});

// toggle todo completed
$root.addEventListener('change', e => {
  if (!e.target.matches('.toggle')) return;

  toggleTodoCompleted(e.target.closest('li').dataset.id);
  setFocusTo(document.querySelector('.new-todo'));
});

// edit mode
// TODO: 리렌더링시 편집중인 텍스트가 유지되지 않는다.
$root.addEventListener('dblclick', e => {
  if (!e.target.matches('.view > label')) return;

  const { id } = e.target.closest('li').dataset;
  changeToEditMode(id);
  setFocusTo(document.querySelector(`[data-id="${id}"]`).querySelector('.edit'));
});

// update todo content
$root.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.matches('.edit')) return;

  updateTodoContent(e.target.closest('li').dataset.id, e.target.value);
  setFocusTo(document.querySelector('.new-todo'));
});

// remove todo
$root.addEventListener('click', e => {
  if (!e.target.matches('.destroy')) return;

  removeTodo(e.target.closest('li').dataset.id);
  setFocusTo(document.querySelector('.new-todo'));
});

// filter todos
$root.addEventListener('click', e => {
  if (!e.target.matches('.filters > li > a')) return;

  changeCurrentFilter(e.target.id);
  setFocusTo(document.querySelector('.new-todo'));
});

// remove all completed todos
$root.addEventListener('click', e => {
  if (!e.target.matches('.clear-completed')) return;

  removeAllCompletedTodos();
  setFocusTo(document.querySelector('.new-todo'));
});
