import React from 'react';
import { useSelector } from 'react-redux';

import TodoListItem from './TodoListItem';

const TodoList = () => {
  const todos = useSelector((state) => state.todos);

  const todoList = todos.map((todo) => <TodoListItem key={todo.id} todo={todo} />);

  return (
    <section className="list-container">
      <div className="container">
        <ul>{todoList}</ul>
      </div>
    </section>
  );
};

export default TodoList;
