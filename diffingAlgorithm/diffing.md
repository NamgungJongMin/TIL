# react 재조정

## 비교 알고리즘

두개의 트리를 비교할 때, React는 두 엘리먼트의 root 엘리먼트부터 비교.
이후 동작은 루트 엘리먼트의 타입에따라 달라짐.

### 1. DOM 엘리먼트 타입이 다른 경우

두 루트 엘리먼트 타입이 다르면 이전 트리를 버리고 완전히 새로운 트리를 구축한다.
(트리 전체를 재구축)

트리를 버릴 때에는 이전 DOM 노드들은 모두 파괴된다.

```js
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```

이 비교에서 이전 Counter가 사라지고, 새로 다시 마운트.

### 2.DOM 엘리먼트 타입이 같은 경우

```js
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```

DOM 노드 상에 className만 수정

```js
<div style={{color: 'red', fontWeight: 'bold'}} />

<div style={{color: 'green', fontWeight: 'bold'}} />
```

style이 갱신될 때 또한 변경된 속성만을 갱신함.

> DOM노드의 처리가 끝나면 해당 노드의 자식들을 재귀적으로 처리

## 재귀적 처리

### 같은 타입의 컴포넌트 엘리먼트

컴포넌트가 갱신되면 인스턴스는 동일하게 우지되어 렌더링 간 state가 유지됨. 이후 새로운 엘리먼ㅌ느의 내용을 반영하기 위해 현재 컴포넌트 인스턴스의 props를 갱신함.

다음으로 render() 메서드가 호출되고 비교 알고리즘이 이전 결과와 새로운 결과를 재귀적으로 처리.

### 자식에 대한 재귀적 처리

DOM 노드의 자식들을 재귀적으로 처리할 때, 기본적으로 동시에 두 리스트를 순회하고 차이점이 있으면 변경을 생성.

```js
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

먼저 <li>first</li>가 일치하는 것을 확인하고, <li>second</li>가 일치하는 것을 확인.
마지막으로 <li>third</li>를 트리에 추가

```js
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

그런데 맨 앞에 엘리먼트를 추가하는 경우 성능이 좋지 않다. 위의 설명대로라면 모든 자식을 변경하게 됨. duke !== Connecticut

### Keys

이러한 문제를 해결하기 위해, React에서 key 속성을 지원. 자식들이 key를 가지고 있다면 key를 통해 기존 트리와 이후 트리의 자식들이 일치하는지 확인.

```js
ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

key를 정하는 것은 어렵지 않음 / 일반적으로 엘리먼트가 식별자를 가지고 있을 것이고 그대류ㅗ 해당 데이터를 key로 사용하면 됨.

key는 형제 사이에서만 유일하면 되고, 전역에서 유일할 필요는 없다.


