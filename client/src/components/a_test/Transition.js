import React, { Component } from 'react'
//https://reactjs.org/docs/animation.html

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6\

export default class Transition extends React.Component {
    constructor(props) {
      super(props);
      this.state = {items: ['hello', 'world']};
      this.handleAdd = this.handleAdd.bind(this);
    }
  
    handleAdd() {
      const newItems = this.state.items.concat([
        prompt('Enter some text')
      ]);
      this.setState({items: newItems});
    }
  
    handleRemove(i) {
      let newItems = this.state.items.slice();
      newItems.splice(i, 1);
      this.setState({items: newItems});
    }
  
    render() {
      const items = this.state.items.map((item, i) => (
        <div key={item} onClick={() => this.handleRemove(i)}>
          {item}
        </div>
      ));
  
      return (
        <div>
          <button onClick={this.handleAdd}>Add Item</button>
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={2000}
            transitionLeaveTimeout={2000}>
  
            {items}
          </ReactCSSTransitionGroup>
        </div>
      );
    }
  }