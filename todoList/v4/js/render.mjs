const $root = document.getElementById('root');
const filterIds = ['all', 'active', 'completed'];
const render = state => {
  console.log('[STATE]', state);

  const { todos, editingTodoIds, currentFilterId } = state;

  // active 상태인 todo의 갯수
  const countActiveTodos = todos.filter(todo => !todo.completed).length;
  // completed 상태인 todo의 갯수
  const countCompletedTodos = todos.filter(todo => todo.completed).length;
  // 현재 선택 중인 currentFilterId를 기준으로 todos 배열을 필터링
  const filteredTodos = todos.filter(({ completed }) =>
    currentFilterId === 'completed' ? completed : currentFilterId === 'active' ? !completed : true
  );

  // prettier-ignore
  const domString = `
    <section class="todo-app">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" autofocus />
      </header>
      <section class="main ${todos.length === 0 ? 'hidden' : ''}">
        <!-- 체크박스가 on 상태가 되면 모든 todo를 checked 상태로 변경한다. -->
        <input type="checkbox" id="toggle-all" class="toggle-all" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
        ${filteredTodos.map(({ id, content, completed }) => `
        <li data-id="${id}" class="${editingTodoIds.includes(id) ? 'editing' : ''}">
          <div class="view">
            <input type="checkbox" class="toggle" ${completed ? 'checked' : ''} />
            <label>${content}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${content}" />
        </li>`).join('')}
        </ul>
      </section>
      <footer class="footer ${todos.length === 0 ? 'hidden' : ''}">
        <span class="todo-count">${countActiveTodos} item${countActiveTodos > 1 ? 's' : ''} left</span>
        <ul class="filters">
          ${filterIds.map(filterId => `
          <li>
            <a id="${filterId}" class="${filterId === currentFilterId ? 'selected' : ''}" href="javascript:void(0);">
              <!-- text-transform: capitalize; -->
              ${filterId[0].toUpperCase() + filterId.slice(1)}
            </a>
          </li>`).join('')}
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

  /**
   * TODO: diffing & Reconciliation
   *
   * const $virtual = $root.cloneNode();
   * $virtual.innerHTML = domString;
   *
   * applyDiff($root, $virtual);
   */
  $root.innerHTML = domString;
};

export default render;
