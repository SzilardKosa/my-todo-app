import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateTodo, selectTodoById } from './todosSlice';

const TodoDetails = ({ match }) => {
  const { id: todoId } = match.params;
  const todo = useSelector((state) => selectTodoById(state, todoId));
  const dispatch = useDispatch();

  const { description, percent } = todo;
  const style = {
    textDecoration: todo.done ? 'line-through' : 'none',
  };

  const handleUpdate = (e) => {
    const target = e.target;
    const percent = parseInt(target.value);
    const done = percent === 100 ? true : false;
    dispatch(updateTodo({ _id: todoId, percent, done }));
  };

  return (
    <section className="details-container">
      <div className="container">
        <div className="row">
          <div className="row-name">Todo:</div>
          <div style={style}>{description}</div>
        </div>
        <div className="row">
          <div className="row-name">Done:</div>
          <input
            name="percent"
            type="range"
            value={percent}
            onChange={handleUpdate}
            className="slider-input"
          />
          <div className="slider-value">{percent}%</div>
        </div>
        <div className="btn-row">
          <Link to="/list">
            <button>Back</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TodoDetails;
