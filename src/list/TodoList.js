import React, { Component } from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';

export class TodoList extends Component {
  render() {
    const todos = this.props.todos.map((todo) => 
      <TodoListItem
        key={todo.id}
        todo={todo}
        onDeleteTodo={this.props.onDeleteTodo}
        onUpdateTodo={this.props.onUpdateTodo} />
    );
    return (
      <section className="list-container">
        <div className="container">
          <ul>
            {todos}
          </ul>
        </div>
      </section>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
}


export default TodoList;
