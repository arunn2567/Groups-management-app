import React, { Component } from 'react';
//App component to render the children of its route.
export default class App extends Component {
  render() {
    return (
      <div>
      {this.props.children}
      </div>
      );
  }
}
