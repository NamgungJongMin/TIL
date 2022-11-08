// filter 연습
let a = {
  todos: [
    { id: 3, content: 'Javascript', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'HTML', completed: false },
  ],
  filterId: 'all',
};

const { todos, filterId } = a;
let c = todos.filter(({ completed }) => (filterId === 'completed' ? completed : !completed));

console.log(c);
