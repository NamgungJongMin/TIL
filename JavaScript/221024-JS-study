# 전역변수 사용의 문제점

## 1) 변수의 생명주기

```
function foo(){
  var x = 'local';
  console.log(x);
  return x;
}

foo();
console.log(x); //output : ReferenceError
```

### 1.1) 예외

### 결론

## 2) 전역변수

### 2.1) 전역변수의 문제점

1. 암묵적 결합

2. 긴 생명주기

3. 스코프 체인 상에서 종점에 존재

4. 네임스페이스 오염

### 2.2) 전역변수 사용 억제하는 방법

1. 즉시 실행 함수

2. 네임스페이스 객체

```
var MYAPP ={};

MYAPP.name = 'lee';

console.log(MYAPP.name); //output: 'lee'
```

3. 모듈 패턴
4. ES6 모듈

---
