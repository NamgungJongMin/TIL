## state 개념

상태라는 것이 무엇인가?

Rendering

상태랑 렌더링에 대해 설명할 수 있는가?

이 두 개념을 가지고 **Component** 를 만들어야 함.

---

페이지 여러 개 존재한다 가정 => 상태를 받아서 쓸 수 있어야함.
이전 상태 유지해야 함.
새로고침 / 페이지 이동 / 애플리케이션 재시작 시 상태 유지

사이드 네비게이션이 오픈된 상태에서 웹 페이지가 렌더링되면 사이드 네비게이션을 트랜지션 X 그대로 렌더링
-> 현재 열려있는 상태인지 닫혀있는 상태인지 확인할 수 있어야함.
