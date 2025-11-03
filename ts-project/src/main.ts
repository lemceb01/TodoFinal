import './style.css'
// import { setupCounter } from './counter.ts'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
}

let todos: Todo[] = [];

const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.querySelector('.todo-list') as HTMLUListElement;


const addTodo = (text:string) => {
  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false
  }
  todos.push(newTodo);
  console.log("check to see if push works: ", todos);
  renderTodos();
}

todoForm.addEventListener('submit', (event:Event) => {
  event.preventDefault(); // stop reloading of page
  const text = todoInput.value.trim();
  if (text !== '') {
    addTodo(text)
    todoInput.value = '';
  }
});

const renderTodos = () => {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `<span>${todo.text}</span>
    <button>Remove</button>`

    // Toggle completion when clicking the text
    const span = li.querySelector('span') as HTMLSpanElement;
    span.addEventListener('click', () => toggleTodo(todo.id));


    addRemoveButtonListener(li, todo.id)
    todoList.appendChild(li);
  });
}

renderTodos();

const addRemoveButtonListener = (li: HTMLLIElement, id:number) => {
  const removeButton = li.querySelector('button') as HTMLButtonElement;
  removeButton?.addEventListener('click', () => 
    removeTodo(id));
}

const toggleTodo = (id: number) => {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

const removeTodo = (id:number) => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}
