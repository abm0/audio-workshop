import React, { useState } from 'react';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl mb-4">To-Do List</h2>
      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-green-500 text-white p-2 ml-2 rounded"
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="border p-2 mb-2 rounded text-black">
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
