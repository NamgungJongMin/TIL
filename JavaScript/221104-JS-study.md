## Date

ISO 방식의 스트링?
UTC로 뽑아오게 된다. 그래서 날짜가 엉크러질 수 있음.
조심해서 써야됨.

## Date - Date

-를 주면 내부객체로 가지고 있는 정수값으로 대체한다.

## DOM / EVENT

todo 애플리케이션

keydonw keyup

ex) keypress
이벤트 중에 폐지된거 많은데 적극적으로 안쓰려고 노력해야됨.
기능은 없어지지 않았음. -> 하위 호환성 유지를 위해서 발생하는 것일 뿐 쓰지마라.

## [] instance of Array

## []가 Array 프로토타입 **체인** 의 일원인지를 파악

## 노드객체의 상속구조를 보면 모든 노드 객체 요소들은 이벤트를 발생시키는 이벤트 요소의 프로토타입 체인의 일원이다.

이벤트는 타입이 구분됨. 왜 나눠놨을까? 객체가 다르다. 이벤트 객체가 이벤트 타입마다 다르다.

ex 마우스 이벤트는 마우스 좌표
키보드는 어떠한 키인지

---

이벤트 다는 방법 3개지

html안 onclick
js 안 onkeyup
안쓰는게 좋은이유 중첩되면 뒤에쓴게 앞에쓴걸 덮어씀
addeventlistener 쓰는게 좋다

e -> 요녀석은 이벤트 핸들러
이벤트가 호출되면 태스큐큐로 이동하고, 콜스택이 빌때까지 기다림.
이벤트 루프를 통해 비었는지 계속 확인하고있고, 비게되면 콜스택으로 이동하여 실행된다.

비동기. 저 함수가 하는 일은. 태스크큐에 쟬 넣어죠. 하고 끝.

이벤트객체는 브라우저가 만든다.
브라우저가 가지고있는 객체를 개발자에게 어떻게 주는가?
이벤트객체를 만든 다음에 호출(태스크 큐에서 실행컨텍스트에 들어간다.)할 때 브라우저의 객체가 실행컨텍스트로 들어가잖아!
그때 변수에 저장할 수 있음.

어떤 키를 가지고있는지, console.log(e) 를 통해 key정보를 보고 사용하자. 키 코드 절대쓰지말고

어트리뷰트는 초기값의 의미 / 프로퍼티는 현재값의 의미
html 노드 객체는 상태를 가지고있다.

```
<input type="text" class="todo-input" placeholder="Enter todo!!" value = "aaa"/> VS 내가 쳐서 들어간 value 는 다른거
```

\$를 변수에 붙인 이유는 고것이 노드객체다 라는 의미

html 문자열 = 앞으로 DOM String 이라고 부를거임

html css js 를 한번에 관리하고 생성할 수는 없을까?
-> 컴포넌트의 등장
-> 우리가 보는 view의 조각

전통적인 방식
html 주도하에 js 와 css가 동작하는 방식

html 없이는 css 와 js가 의미가 없다.
html이 바뀌면 css와 js도 영향을 받는다

react와 vue와 angular를 쓰는 이유

- 대표적인 코드가 querySelector. 이거가 종속을 나타내는
  html이 바뀌면 저것들은 null이다. 너무 html 의존적.
  html바뀌었을때 js가 변경될 가능성이 있다는 것이 문제.

디자인이 바뀔일, class가 바뀔일이 많다. 그러면 js가 안돌아. 너무 쉽게 작성한 코드가 망가짐. 원인이 뭐다? 자바스크립트가 html에 종속되어있다.

-> 그럼 이러한 종속 관계가 역전될 수는 없을까?
종속적 관계를 역전하고 싶다.

자바스크립트 안에다가 html을 집어넣는다!

=> body안 모든 html을 자바스크립트에서 관리하고싶다.
그런데 그러면 다 리렌더링 되잖아!
요것만 해결하면 제어역전이 가능하다!

자바스크립트가 모든것을 주도권을 쥘 수 있다.
이게바로
CBD 방식!

지금 todo.html 을 작성하면서 느낄 것은 예전 방식으로 작성. 작성하면서 문제점 파악하는 것.

trim() - 양끝 공백 제거

```
## 1

create li
문제 코드 = 새로 만들 필요 없는거까지 새로 만든다는 문제 -> 불필요한 리렌더링의 발생
createEl 을 하게되면 너무 코드가 복잡해지고 가독성도 안좋아짐
이렇게 쓰되,
자바스크립트가 html에 종속되어 있는 코드다.

```

form 은 submit 이벤트를 발생시킴.

이벤트 위임은 언제단다?
꼭 써야될때

- 동적으로 만들어지는 요소에는 위임을 걸어야된다.
  checked변수에 담을때 이벤트가 일어나기 전에 담으면 null 나오지

## 이벤트 핸들러 달때

on~으로 하면 버블링만 잡음
addevent~ 디폴트값 버블링만 잡음

즉 캡쳐링은 안잡는다는 것. 잡아버리면 이벤트가 두번 호출되겠지.

이벤트 전파?
호출 순서.

캡쳐링은 위에서부터.
버블링은 아래에서부터.

호출을 하려고 순서대로 돌게 되면서! 이벤트 달려있는 놈을 만날때마다 호출

$ 캡쳐링으로 잡아야겠다고 느낄만한 필요성이 없음.
버블링만 잡아도 아무런 문제가 없다. 기본적으로 버블링 잡으면 됨.

주의: 버블링이 발생하지 않는 이벤트

버블링되는 이벤트들 중엔 반드시 addeventlistener 써야하는 애들 있음
그러니까 그냥 addevent~~ 쓰라는거임

---

체크박스 클릭하면 줄그어지는건 css만으로 하기

---

새로고침하면 초기로 돌아감.

서버를 의식해야함.

그러니까 바뀐 부분을 추상적으로 데이터화.

맨처음 애플리케이션을 구동하면 서버에서 맨먼저 저장된 데이터를 가져와.

데이터 중심으로 애플리 케이션이 동작해야한다.

---

DOMContentLoaded 가 발생하면 = 애플리케이션이 처음 기동하면.

---

동일한 패턴

사용자의 동작이 일어나면 todos에서 변화가 생김. 하나의 방식으로. todos를 가지고 (중심으로) 사용자의 액션마다(이벤트) todos가 바뀐다. todos가 바뀔때마다 바뀐걸 서버에 보낸다. 그리고 그걸가지고 다시 그린다.

데이터 중심으로 돌아간다.

서버에서 가지고 온다라는 것에 대해서는
get이 아니라 fetch라는 말을 쓰도록하자

치신걸 거의 외울정도로 쳐야됨.