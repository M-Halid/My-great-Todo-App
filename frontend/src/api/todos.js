import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

export const getTodos = async () => {
  return await axios.get(API_URL);
};

export const createTodo = async (todo) => {
  return await axios.post(API_URL, todo);
};

export const updateTodo = async (id, todo) => {
  return await axios.put(`${API_URL}/${id}`, todo,{
    headers: {
        'Content-Type': 'application/json',
    }
});
};

export const deleteTodo = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
