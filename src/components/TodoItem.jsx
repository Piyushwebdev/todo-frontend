import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { BiCheckCircle } from "react-icons/bi";

export default function TodoItem(props) {
  const { todo, removeTodo, completeTodo, importantTodo, idx } = props;
  return (
    <div
      className={todo.completed ? "todo-row complete" : "todo-row"}
      style={todo.important ? { background: "orange" } : {}}
    >
      {todo.title}
      <div className="iconsContainer">
        <button onClick={() => importantTodo(idx)} className="important-btn">
          !
        </button>
        <RiCloseCircleLine
          style={{ marginRight: 5 }}
          onClick={() => removeTodo(idx)}
        />
        <BiCheckCircle onClick={() => completeTodo(idx)} />
      </div>
    </div>
  );
}
