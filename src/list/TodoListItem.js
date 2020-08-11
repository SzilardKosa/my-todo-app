import React, { Component } from 'react';
import close from './close.svg';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

export class TodoListItem extends Component {
  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleDelete() {
    this.props.onDeleteTodo(this.props.todo.id);
  }

  handleUpdate(event) {
    const target = event.target;
    const prev = this.props.todo;
    let done = prev.done;
    let percent = prev.percent;
    switch(target.name) {
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
    this.props.onUpdateTodo({...prev, done, percent})
  }
  
  render() {
    const description = this.props.todo.description;
    const percent = this.props.todo.percent;
    const done = this.props.todo.done;
    const id = this.props.todo.id;
    const style = {
      textDecoration: done ? 'line-through' : 'none'
    }
    return (
      <li>
        <label className="checkbox">
          <input
            name="done"
            type="checkbox"
            checked={done}
            onChange={this.handleUpdate} />
          <span className="checkmark"></span>
        </label>

        <div className="description" style={style}>
        <Link to={`/list/${id}`} >{description}</Link>
        </div>

        <input
          name="percent"
          type="range"
          value={percent}
          onChange={this.handleUpdate}
          className="slider-input"/>
        <div className="slider-value">{percent}%</div>

        <button className="delete-btn" onClick={this.handleDelete}>
          <img src={close} alt="delete button"/>
        </button>
      </li>
    )
  }
}

TodoListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
}

export default TodoListItem;
