const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new todo
router.post('/', async (req, res) => {
  console.log(req.body);  
  const todo = new Todo({
    title: req.body.title,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      todo.title = req.body.title;
      todo.completed = req.body.completed;
      const updatedTodo = await todo.save();
      res.json(updatedTodo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
          return res.status(404).json({ message: 'Todo not found' });
      }

      await todo.deleteOne();
      res.json({ message: 'Todo deleted' });
  } catch (err) {
      console.error('Error deleting todo:', err); // Log the error
      res.status(500).json({ message: err.message });
  }
});



module.exports = router;
