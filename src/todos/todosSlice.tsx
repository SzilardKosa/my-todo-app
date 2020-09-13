import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';

export interface Todo {
  _id: string;
  description: string;
  percent: number;
  done: boolean;
}

const todosAdapter = createEntityAdapter<Todo>({
  selectId: (todo) => todo._id,
});

type SliceState = { status: 'idle' | 'loading' | 'succeeded' | 'failed'; error: any };

const initialState = todosAdapter.getInitialState<SliceState>({ status: 'idle', error: null });

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('http://localhost:3030/todos');
  return response.data as Todo[];
});

interface NewTodo {
  description: string;
  percent: number;
  done: boolean;
}

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (newTodo: NewTodo) => {
  const response = await axios.post('http://localhost:3030/todos', newTodo);
  return response.data as Todo;
});

interface UpdateTodo {
  _id: string;
  percent: number;
  done: boolean;
}

export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo: UpdateTodo) => {
  const response = await axios.patch(`http://localhost:3030/todos/${updatedTodo._id}`, updatedTodo);
  const { _id: id, percent, done } = response.data as Todo;
  return { id, changes: { percent, done } };
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId: string) => {
  const response = await axios.delete(`http://localhost:3030/todos/${todoId}`);
  return response.data._id as string;
});

//fetch(GET), add(POST), delete(DELETE), update(PATCH)

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    //for typescripts
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = 'succeeded';
      // Add any fetched todos to the array
      todosAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
    builder.addCase(addNewTodo.fulfilled, todosAdapter.addOne);
    builder.addCase(updateTodo.fulfilled, todosAdapter.updateOne);
    builder.addCase(deleteTodo.fulfilled, todosAdapter.removeOne);
  },
});

export default todosSlice.reducer;

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors((state: RootState) => state.todos);
