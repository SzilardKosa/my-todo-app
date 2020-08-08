import React, { Component } from 'react'

export class AddTodo extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      text: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddTodo(this.state.text)
  }
  

  render() {
    return (
      <section className="form-container">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="desc">Add new item</label>
            <input id="desc" type="text" placeholder="new todo"
                   value={this.state.text} onChange={this.handleChange}/>
            <button type="submit">Add</button>
          </form>
        </div>
      </section>
    )
  }
}

export default AddTodo;
