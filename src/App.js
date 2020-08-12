import React, { Component } from 'react';
import Header from './common/Header';
import AddTodo from './list/AddTodo';
import TodoList from './list/TodoList';
import Footer from './common/Footer';
import Home from './home/Home';
import TodoDetails from './details/TodoDetails';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

let idCount = 4;

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { id: 1, description: 'Wash the dishes', percent: 75, done: false },
        { id: 2, description: 'Make lunch', percent: 25, done: false },
        { id: 3, description: 'Finish a book', percent: 100, done: true },
      ],
    };
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleUpdateTodo = this.handleUpdateTodo.bind(this);
  }

  handleAddTodo(text) {
    const newTodo = {
      id: idCount,
      description: text,
      percent: 0,
      done: false,
    };
    idCount++;
    this.setState({ todos: [...this.state.todos, newTodo] });
  }

  handleDeleteTodo(id) {
    this.setState({ todos: this.state.todos.filter((item) => item.id !== id) });
  }

  handleUpdateTodo(todo) {
    this.setState({
      todos: this.state.todos.map((item) => {
        if (item.id === todo.id) {
          return todo;
        } else {
          return item;
        }
      }),
    });
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <Switch>
            <Route path="/list/:id">
              <TodoDetails todos={this.state.todos} onUpdateTodo={this.handleUpdateTodo} />
            </Route>
            <Route path="/list">
              <AddTodo onAddTodo={this.handleAddTodo} />
              <TodoList
                todos={this.state.todos}
                onUpdateTodo={this.handleUpdateTodo}
                onDeleteTodo={this.handleDeleteTodo}
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
  }
}

export default App;
