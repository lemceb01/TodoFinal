import './style.css'
// import { setupCounter } from './counter.ts'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
}

let todos: Todo[] = [];

let currentFilter: 'all' | 'active' | 'completed' = 'all';

const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.querySelector('.todo-list') as HTMLUListElement;
const todoDate = document.getElementById('todo-date') as HTMLInputElement;


const addTodo = (text:string) => {
  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false,
    dueDate: todoDate.value ? todoDate.value : undefined
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
    todoDate.value = '';
  }
});

const renderTodos = () => {
  todoList.innerHTML = '';

  let filteredTodos = todos;
  if (currentFilter === 'active') {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else if (currentFilter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  }

  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

    li.innerHTML = `
    <span style="${todo.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
    ${todo.text}
     ${todo.dueDate ? `<small>(Due: ${todo.dueDate})</small>` : ''}
    </span>
      <div class="todo-actions">
        <button class="toggle-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
        <button class="remove-btn">Remove</button>
      </div>
      `;

    if (isOverdue) {
      li.classList.add('overdue');
    }
        const toggleButton = li.querySelector('.toggle-btn') as HTMLButtonElement;
        const removeButton = li.querySelector('.remove-btn') as HTMLButtonElement;

        toggleButton.addEventListener('click', () => toggleTodo(todo.id));

        removeButton.addEventListener('click', () => removeTodo(todo.id));
        todoList.appendChild(li);
      });
}

renderTodos();

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

const updateActiveFilterButton = (activeButtonId: string) => {
  const filterButtons = document.querySelectorAll('.filter-buttons button');
  filterButtons.forEach(btn => {
    if (btn.id === activeButtonId) {
      btn.classList.add('active-filter');
    } else {
      btn.classList.remove('active-filter');
    }
  });
}

document.getElementById('show-all')?.addEventListener('click', () => {
  currentFilter = 'all';
  updateActiveFilterButton('show-all');
  renderTodos();
});

document.getElementById('show-active')?.addEventListener('click', () => {
  currentFilter = 'active';
  updateActiveFilterButton('show-active');
  renderTodos();
});

document.getElementById('show-completed')?.addEventListener('click', () => {
  currentFilter = 'completed';
  updateActiveFilterButton('show-completed');
  renderTodos();
});