import {
  removeAllCompletedTodos,
  changeCurrentFilter,
  removeTodo,
  updateTodoContent,
  changeToEditMode,
  toggleAllTodoCompleted,
  addTodo,
  toggleTodoCompleted,
  fetchTodos,
} from './model.mjs';

const $root = document.getElementById('root');
window.addEventListener('DOMContentLoaded', fetchTodos);

// toggle all todo completed
$root.addEventListener('change', e => {
  if (!e.target.matches('.toggle-all')) return;
  toggleAllTodoCompleted();
});

// add todo
$root.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.matches('.new-todo')) return;

  const content = e.target.value.trim();
  if (content) addTodo(content);
  e.target.value = '';
});

// toggle todo completed
$root.addEventListener('change', e => {
  if (!e.target.matches('.toggle')) return;
  toggleTodoCompleted(e.target.closest('li').dataset.id);
});

// edit mode
$root.addEventListener('dblclick', e => {
  if (!e.target.matches('.view > label')) return;
  changeToEditMode(e.target.closest('li').dataset.id);
});

// update todo content
$root.addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key !== 'Enter' || !e.target.matches('.edit')) return;

  updateTodoContent(e.target.closest('li').dataset.id, e.target.value);
});

// remove todo
$root.addEventListener('click', e => {
  if (!e.target.matches('.destroy')) return;
  removeTodo(e.target.closest('li').dataset.id);
});

// filter todos
$root.addEventListener('click', e => {
  if (!e.target.matches('.filters > li > a')) return;
  changeCurrentFilter(e.target.id);
});

// remove all completed todos
$root.addEventListener('click', e => {
  if (!e.target.matches('.clear-completed')) return;
  removeAllCompletedTodos();
});
