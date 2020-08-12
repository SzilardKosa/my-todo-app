import React, { Component } from 'react';
import DarkLightSwitch from './DarkLightSwitch';

import { Link } from 'react-router-dom';

export class Header extends Component {
  render() {
    return (
      <header>
        <div className="container">
          <nav>
            <Link to="/list" className="brand">
              TodoListApp
            </Link>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/list">List</Link>
              </li>
              <li>
                <DarkLightSwitch />
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
