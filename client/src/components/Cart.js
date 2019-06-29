import React, { Component } from 'react'
import * as firebase from 'firebase'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

class Cart extends Component {

  constructor(){
    super();
  }

  render() {

    return (
      <div>
        Cart
        
      </div>
    )
  }
}


export default connect(null)(withRouter(Cart));
