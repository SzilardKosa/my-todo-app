import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const TodoDetails = (props) => {
  const params = useParams();
  const id = parseInt(params.id);
  const todo = props.todos.find((item) => item.id === id);
  const description = todo.description;
  const percent = todo.percent;
  const style = {
    textDecoration: todo.done ? 'line-through' : 'none',
  };

  function handleUpdate(event) {
    const target = event.target;
    const percent = parseInt(target.value);
    const done = percent === 100 ? true : false;
    props.onUpdateTodo({ ...todo, done, percent });
  }

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

TodoDetails.propTypes = {
  todos: PropTypes.array.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
};

export default TodoDetails;
