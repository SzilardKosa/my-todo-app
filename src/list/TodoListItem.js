import React from 'react';
import close from './close.svg';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TodoListItem = (props) => {
  function handleDelete() {
    props.onDeleteTodo(props.todo.id);
  }

  function handleUpdate(event) {
    const target = event.target;
    const prev = props.todo;
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
    props.onUpdateTodo({ ...prev, done, percent });
  }

  const description = props.todo.description;
  const percent = props.todo.percent;
  const done = props.todo.done;
  const id = props.todo.id;
  const style = {
    textDecoration: done ? 'line-through' : 'none',
  };
  return (
    <li>
      <label className="checkbox">
        <input name="done" type="checkbox" checked={done} onChange={handleUpdate} />
        <span className="checkmark"></span>
      </label>

      <div className="description" style={style}>
        <Link to={`/list/${id}`}>{description}</Link>
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
  todo: PropTypes.object.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
