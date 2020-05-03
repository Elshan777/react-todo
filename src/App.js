import React, {useState, useEffect} from 'react';
import './App.css'
import axios from 'axios';

const url = "https://angle-trio.ew.r.appspot.com/todo";


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
    <div style={{textDecoration: todo.completed ? 'line-through': ''}} className="todo-text">{todo.text}</div>
    <div className="btn-group">
      <button onClick={() => completeTodo(index)} className={`btn ${todo.completed ? "btn-success" : "btn-primary"}`}>
        {todo.completed ? 'Completed' : 'Complete'}
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
      completed: false
    }
    axios.post(`${url}`, newTodo)
      .then(res => {
        console.log(res.data);
        console.log(todos);
      })
  }

  const completeTodo = index => {
    let id = todos[index].id;
    const newTodos = [...todos];
    newTodos[index].completed = true;
    setTodos(newTodos);
    axios.get(`${url}/done/${id}`)
      .then(res => {
        console.log(res.data);
        console.log(todos);

      })
  } 

  const deleteTodo = index => {
    let id = todos[index].id;
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    axios.get(`${url}/delete/${id}`)
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
        {todoList ? todoList : "Loading"}
    </div>
  )

}

export default App;
