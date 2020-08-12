import React, { Component } from 'react';

export class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container footer-container">
          <span className="brand">TodoListApp</span>
          <div>
            Icons made by{' '}
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>{' '}
            from{' '}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
