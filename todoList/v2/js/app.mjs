import {
  removeAllCompletedTodos,
  removeTodo,
  changeToEditMode,
  changeCurrentFilter,
  updateTodoContent,
  toggleAllTodoCompleted,
  toggleTodoCompleted,
  fetchTodos,
  addTodo,
} from './model.mjs';

const $toggleAll = document.querySelector('.toggle-all');
const $newTodo = document.querySelector('.new-todo');
const $todoList = document.querySelector('.todo-list');
const $filters = document.querySelector('.filters');
const $clearCompleted = document.querySelector('.clear-completed');

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
