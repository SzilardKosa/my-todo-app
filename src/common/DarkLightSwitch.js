import React, { Component } from 'react'
import moon from './moon.svg';
import sun from './sun.svg';

export class DarkLightSwitch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lightTheme: false
    }
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(event) {
    const checked = event.target.checked;
    checked ? document.body.classList.add('light-theme') :
    document.body.classList.remove('light-theme')
    this.setState({lightTheme: checked});
  }


  render() {
    return (
      <label className="switch">
        <input
          type="checkbox"
          checked={this.state.lightTheme}
          onChange={this.handleUpdate} />
        <span className="slider">
          <span className="icon">
            <img src={moon} alt="moon icon" className="dark"/>
            <img src={sun} alt="sun icon" className="light"/>
          </span>
        </span>
      </label>
    )
  }
}

export default DarkLightSwitch;
