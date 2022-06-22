import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  async function fetchTodos() {
    try {
      const res = await axios.get("http://localhost:5000/todos");
      console.log(res.data);
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = (text) => {
    let id = 1;
    if (todos.length > 0) {
      id = todos[0].id + 1;
    }
    let todo = { id: id, text: text, completed: false, important: false };
    let newTodos = [todo, ...todos];
    console.log(newTodos);
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    axios.delete("http://localhost:5000/todos/:id")  
      .then(res => {  
        console.log(res);  
        console.log(res.data);    
        const todos = this.state.todos.filter(todos => todos.id !== id);  
        this.setState({ todos });  
      })  
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const importantTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.important = !todo.important;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  let sortedTodos = todos.sort((a, b) => b.important - a.important);
  console.log(sortedTodos);
  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <hr className="seperator" />
      {sortedTodos.map((todo, idx) => {
        return (
          <TodoItem
            removeTodo={removeTodo}
            completeTodo={completeTodo}
            importantTodo={importantTodo}
            todo={todo}
            idx={idx}
            key={todo.id}
          />
        );
      })}
    </div>
  );
}

export default App;
