import React, { Component } from "react";

export default class Third extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        {t.name}
        <br />
        {t.desc}
        <br />
        {t.price}Rs
        <br />
        {t.qty}
        <hr />
      </div>
    );
  }
}
