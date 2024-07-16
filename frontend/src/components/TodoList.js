import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todos';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos();
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = { title };
    const response = await createTodo(newTodo);
    setTodos([...todos, response.data]);
    setTitle('');
  };

  const handleUpdate = async (id, completed) => {
    const updatedTodo = todos.find(todo => todo._id === id);
    const response = await updateTodo(id, { ...updatedTodo, completed: !completed });
    setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
  };

  const handleDelete = async (id) => {
    try {
        await deleteTodo(id);
        setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
        console.error('Error deleting todo:', error); // Log the error
    }
};


  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
          required
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            <button onClick={() => handleUpdate(todo._id, todo.completed)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
