import React, { useState } from 'react';
import Header from './common/Header';
import AddTodo from './list/AddTodo';
import TodoList from './list/TodoList';
import Footer from './common/Footer';
import Home from './home/Home';
import TodoDetails from './details/TodoDetails';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

let idCount = 4;

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, description: 'Wash the dishes', percent: 75, done: false },
    { id: 2, description: 'Make lunch', percent: 25, done: false },
    { id: 3, description: 'Finish a book', percent: 100, done: true },
  ]);

  function handleAddTodo(text) {
    const newTodo = {
      id: idCount,
      description: text,
      percent: 0,
      done: false,
    };
    idCount++;
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  function handleDeleteTodo(id) {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
  }

  function handleUpdateTodo(todo) {
    setTodos((prevTodos) =>
      prevTodos.map((item) => {
        if (item.id === todo.id) {
          return todo;
        } else {
          return item;
        }
      })
    );
  }

  return (
    <Router>
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/list/:id">
            <TodoDetails todos={todos} onUpdateTodo={handleUpdateTodo} />
          </Route>
          <Route path="/list">
            <AddTodo onAddTodo={handleAddTodo} />
            <TodoList
              todos={todos}
              onUpdateTodo={handleUpdateTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </React.Fragment>
    </Router>
  );
};

export default App;
