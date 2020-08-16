import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddTodo = (props) => {
  const [text, setText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddTodo(text);
  }

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
          <button type="submit">Add</button>
        </form>
      </div>
    </section>
  );
};

AddTodo.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodo;
