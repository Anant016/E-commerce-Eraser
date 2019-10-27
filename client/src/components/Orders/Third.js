import React, { Component } from "react";

export default class Third extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col">
          <b>{t.name}</b><br/>
          {t.desc}<br/>
          </div>
          <div className="col">
          <div className="card" style={{textAlign:"center"}}>
            {t.qty}x
          </div>
          </div>
          <div className="col">
          Rs {t.price}
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
