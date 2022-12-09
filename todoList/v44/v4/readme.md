# Changelog

### Fixed

- 2022-11-10
  - 리렌더링 시 .toggle-all 요소의 checked가 유지되도록 수정
    - render 함수 수정
  - hidden 클래스를 사용해 요소를 감추는 대신 optional rendering을 사용하도록 수정
    - render 함수 수정
  - 리렌더링 시 .new-todo 요소의 value가 유지되도록 수정
    - render 함수 수정
    - inputNewTodoValue 상태 추가
    - input 이벤트 핸들러 추가
    - changeInputNewTodoValue 함수 추가
  - 리렌더링 시 .new-todo 요소 또는 .edit 요소에 focus가 설정되도록 수정
    - setFocusTo 함수 추가
  - 모든 todo.completed가 true 또는 false로 변경되면 isCheckedToggleAll 상태도 변경되도록 수정
    - toggleTodoCompleted 함수 수정
