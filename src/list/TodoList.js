import React from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';

const TodoList = ({ todos, onDeleteTodo, onUpdateTodo }) => {
  const todoList = todos.map((todo) => (
    <TodoListItem
      key={todo.id}
      todo={todo}
      onDeleteTodo={onDeleteTodo}
      onUpdateTodo={onUpdateTodo}
    />
  ));
  return (
    <section className="list-container">
      <div className="container">
        <ul>{todoList}</ul>
      </div>
    </section>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
};

export default TodoList;
