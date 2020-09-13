import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TodoListItem from './TodoListItem';
import { selectTodoIds, fetchTodos } from './todosSlice';
import { RootState } from '../app/store';

const TodoList = () => {
  const dispatch = useDispatch();
  const todoIds = useSelector(selectTodoIds) as string[];

  const fetchStatus = useSelector((state: RootState) => state.todos.status);
  const error = useSelector((state: RootState) => state.todos.error);

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
  } else if (fetchStatus === 'failed') {
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
