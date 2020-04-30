import React, {useState} from 'react';
import './App.css'


function TodoForm({addTodo}) {
  const [value, setvalue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setvalue('');
  }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" className="input" value={value}
        placeholder="Add Todo..."
        onChange={e => setvalue(e.target.value)}/>
    </form>
  )
}

function Todo({todo, index, completeTodo, deleteTodo}) {
  return (
  <div className="todo">
    <div style={{textDecoration: todo.isCompleted ? 'line-through': ''}} className="todo-text">{todo.text}</div>
    <div className="btn-group">
      <button onClick={() => completeTodo(index)} className={`btn ${todo.isCompleted ? "btn-success" : "btn-primary"}`}>
        {todo.isCompleted ? 'Completed' : 'Complete'}
      </button>
      <button onClick={() => deleteTodo(index)} className="btn btn-danger">x</button>
    </div>
  </div>
  )
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: 'Learn about react hooks',
      isCompleted: false
    },
    {
      text: 'Meet friends',
      isCompleted: true
    },
    {
      text: 'Build cool application',
      isCompleted: false
    },
  ])

  const addTodo = text => {
    const newTodos = [...todos, {text}];
    setTodos(newTodos);
  }

  const completeTodo = index => {
    // const newTodos = todos.map(todo => (todo.index===index ? (todo.isCompleted = true) : todo));
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  } 

  const deleteTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="app">
        <div className="todo-list">
          {todos.map((todo, index) => (
            <Todo key={index} index={index} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo}/>
          ))}
          <TodoForm addTodo={addTodo} deleteTodo={deleteTodo}/>
        </div>
    </div>
  )

}

export default App;
