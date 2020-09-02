import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos: [],
  status: 'idle',
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('http://localhost:3030/todos');
  return response.data;
});

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (newTodo) => {
  const response = await axios.post('http://localhost:3030/todos', newTodo);
  return response.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo) => {
  const response = await axios.patch(`http://localhost:3030/todos/${updatedTodo._id}`, updatedTodo);
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId) => {
  const response = await axios.delete(`http://localhost:3030/todos/${todoId}`);
  return response.data;
});

//fetch(GET), add(POST), delete(DELETE), update(PATCH)
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched todos to the array
      state.todos = state.todos.concat(action.payload);
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [addNewTodo.fulfilled]: (state, action) => {
      state.todos.push(action.payload);
    },
    [updateTodo.fulfilled]: (state, action) => {
      const { _id, percent, done } = action.payload;
      const existingTodo = state.todos.find((todo) => todo._id === _id);
      if (existingTodo) {
        existingTodo.percent = percent;
        existingTodo.done = done;
      }
    },
    [deleteTodo.fulfilled]: (state, action) => {
      const { _id } = action.payload;
      const index = state.todos.findIndex((todo) => todo._id === _id);
      state.todos.splice(index, 1);
    },
  },
});

export default todosSlice.reducer;

export const selectAllTodos = (state) => state.todos.todos;

export const selectTodoById = (state, todoId) =>
  state.todos.todos.find((todo) => todo._id === todoId);
