import axios from 'axios';

const url = "http://localhost:8080/todo/todo-list";

const fetchTodos = async () => {
    try {
        // console.log("Hello");
        axios.get(url)
        .then(res => {
          const todos = res.data;
          console.log(todos);
          
          return todos.map((todo) => todo);
        })
       
    } catch (error) {
        console.log(error);
        
    }
}

export default fetchTodos;