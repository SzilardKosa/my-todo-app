import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
  { id: '1', description: 'Wash the dishes', percent: 75, done: false },
  { id: '2', description: 'Make lunch', percent: 25, done: false },
  { id: '3', description: 'Finish a book', percent: 100, done: true },
];

//add, delete, update
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(description) {
        return {
          payload: {
            id: nanoid(),
            description,
            percent: 0,
            done: false,
          },
        };
      },
    },
    todoUpdated(state, action) {
      const { id, percent, done } = action.payload;
      const existingTodo = state.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.percent = percent;
        existingTodo.done = done;
      }
    },
    todoDeleted(state, action) {
      const { todoId } = action.payload;
      const index = state.findIndex((todo) => todo.id === todoId);
      state.splice(index, 1);
    },
  },
});

export const { todoAdded, todoUpdated, todoDeleted } = todosSlice.actions;

export default todosSlice.reducer;
