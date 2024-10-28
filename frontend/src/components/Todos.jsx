/* eslint-disable react/prop-types */
import React from 'react'

const Todos = ({ todos, handleDelete, updateTodo }) => {
  return (
    <div key={Math.random() * 100} style={{ marginTop: "20px" }}>
      {todos.map((item) => {
        return (
          <div key={item.id}>
            <span>{item.name}</span>
            <button onClick={() => updateTodo(item.id)}>update</button>
            <button
              onClick={() => handleDelete(item.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Todos