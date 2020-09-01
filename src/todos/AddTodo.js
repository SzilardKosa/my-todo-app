import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoAdded } from './todosSlice';

const AddTodo = () => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      dispatch(todoAdded(text));
    }
  };

  const canSave = Boolean(text);

  return (
    <section className="form-container">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="desc">Add new item</label>
          <input
            id="desc"
            type="text"
            placeholder="new todo"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" disabled={!canSave}>
            Add
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddTodo;
