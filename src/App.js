import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './common/Header';
import AddTodo from './todos/AddTodo';
import TodoList from './todos/TodoList';
import Footer from './common/Footer';
import Home from './common/Home';
import TodoDetails from './todos/TodoDetails';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route
          exact
          path="/list"
          render={() => (
            <React.Fragment>
              <AddTodo />
              <TodoList />
            </React.Fragment>
          )}
        />
        <Route exact path="/list/:id" component={TodoDetails} />
        <Route exact path="/" component={Home} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
