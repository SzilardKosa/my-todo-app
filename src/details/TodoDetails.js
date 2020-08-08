import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

export class TodoDetails extends Component {
  constructor(props) {
    super(props)
  
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(event) {
    const id = parseInt(this.props.match.params.id);
    const prev = this.props.todos.find(item => item.id === id);
    const target = event.target;
    const percent = parseInt(target.value);
    const done = percent === 100 ? true : false;
    this.props.onUpdateTodo({...prev, done, percent})
  }
  
  render() {
    const id = parseInt(this.props.match.params.id);
    const todo = this.props.todos.find(item => item.id === id);
    const description = todo.description;
    const percent = todo.percent;
    const style = {
      textDecoration: todo.done ? 'line-through' : 'none'
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
              onChange={this.handleUpdate}
              className="slider-input"/>
            <div className="slider-value">{percent}%</div>
          </div>
          <div className="btn-row">
            <Link to="/list" ><button>Back</button></Link>
          </div>
        </div>
      </section>
    )
  }
}

export default withRouter(TodoDetails);
