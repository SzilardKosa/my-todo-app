import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { addNewTodo } from './todosSlice';

const AddTodo = () => {
  const [text, setText] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const dispatch = useDispatch();

  const canSave = Boolean(text) && addRequestStatus === 'idle';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        const resultAction = await dispatch(
          addNewTodo({ description: text, percent: 0, done: false })
        );
        unwrapResult(resultAction);
        setText('');
      } catch (err) {
        console.error('Failed to save the todo: ', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

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
