import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateTodo, deleteTodo, selectTodoById } from './todosSlice';
import close from './close.svg';
import PropTypes from 'prop-types';

const TodoListItem = ({ todoId }) => {
  const todo = useSelector((state) => selectTodoById(state, todoId));
  const { description, percent, done, _id } = todo;
  const style = {
    textDecoration: done ? 'line-through' : 'none',
  };

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo(_id));
  };

  const handleUpdate = (e) => {
    const target = e.target;
    const prev = todo;
    let done = prev.done;
    let percent = prev.percent;
    switch (target.name) {
      case 'done':
        done = target.checked;
        percent = done ? 100 : 0;
        break;
      case 'percent':
        percent = parseInt(target.value);
        done = percent === 100 ? true : false;
        break;
      default:
        console.log('error');
    }
    dispatch(updateTodo({ _id, percent, done }));
  };

  return (
    <li>
      <label className="checkbox">
        <input name="done" type="checkbox" checked={done} onChange={handleUpdate} />
        <span className="checkmark"></span>
      </label>

      <div className="description" style={style}>
        <Link to={`/list/${_id}`}>{description}</Link>
      </div>

      <input
        name="percent"
        type="range"
        value={percent}
        onChange={handleUpdate}
        className="slider-input"
      />
      <div className="slider-value">{percent}%</div>

      <button className="delete-btn" onClick={handleDelete}>
        <img src={close} alt="delete button" />
      </button>
    </li>
  );
};

TodoListItem.propTypes = {
  todoId: PropTypes.string.isRequired,
};

export default TodoListItem;
