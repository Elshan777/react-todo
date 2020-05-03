import React, {useState, useEffect} from 'react';
import './App.css'
import fetchTodos from './api/index'
import axios from 'axios';

const url = "http://localhost:8080/todo";


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
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchAPI = async () =>{
      axios.get(`${url}/todo-list`)
        .then(res => {
          const todos = res.data;
          setTodos(todos);
          console.log(todos);
          
      })  
    }

    fetchAPI();
  }, [setTodos])

  const addTodo = text => {
    const newTodos = [...todos, {text}];
    setTodos(newTodos);
    const newTodo = {
      text: text,
      isCompleted: false
    }
    axios.post(`${url}`, newTodo)
      .then(res => {
        console.log(res.data);
        console.log(todos);
      })
  }

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
    axios.get(`${url}/done/${index}`)
      .then(res => {
        console.log(res.data);
        console.log(todos);

      })
  } 

  const deleteTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    axios.get(`${url}/delete/${index}`)
      .then(res => {
        console.log(res.data);
      })
  }

  const todoList = ( todos ? (
        <div className="todo-list">
          {todos ? todos.map((todo, index) => (
            <Todo key={index} index={index} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo}/>
          )) : "Loading"}
          <TodoForm addTodo={addTodo} deleteTodo={deleteTodo}/>
        </div>
      ) : "Loading"
  )

  return (
    <div className="app">
        {todoList}
    </div>
  )

}

export default App;
