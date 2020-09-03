import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TodoListItem from './TodoListItem';
import { selectTodoIds, fetchTodos } from './todosSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const todoIds = useSelector(selectTodoIds);

  const fetchStatus = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchTodos());
    }
  }, [fetchStatus, dispatch]);

  let content;

  if (fetchStatus === 'loading') {
    content = (
      <div className="spinner">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else if (fetchStatus === 'succeeded') {
    content = todoIds.map((todoId) => <TodoListItem key={todoId} todoId={todoId} />);
  } else if (fetchStatus === 'error') {
    content = <div>{error}</div>;
  }

  return (
    <section className="list-container">
      <div className="container">
        <ul>{content}</ul>
      </div>
    </section>
  );
};

export default TodoList;
