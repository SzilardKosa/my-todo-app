import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const todosAdapter = createEntityAdapter({
  selectId: (todo) => todo._id,
});

const initialState = todosAdapter.getInitialState({ status: 'idle', error: null });

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
  const { _id: id, percent, done } = response.data;
  return { id, changes: { percent, done } };
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId) => {
  const response = await axios.delete(`http://localhost:3030/todos/${todoId}`);
  return response.data._id;
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
      todosAdapter.upsertMany(state, action.payload);
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [addNewTodo.fulfilled]: todosAdapter.addOne,
    [updateTodo.fulfilled]: todosAdapter.updateOne,
    [deleteTodo.fulfilled]: todosAdapter.removeOne,
  },
});

export default todosSlice.reducer;

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors((state) => state.todos);
