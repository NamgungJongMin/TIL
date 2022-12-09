const $todoList = document.querySelector('.todo-list');
const $main = document.querySelector('.main');
const $footer = document.querySelector('.footer');
const $todoCount = document.querySelector('.todo-count');
const $filters = document.querySelector('.filters');ads
const $filterItems = $filters.querySelectorAll('a');
const $clearCompleted = document.querySelector('.clear-completed');

const render = state => {
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

export default render;
