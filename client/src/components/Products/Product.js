import React, { Component } from "react";

export default class Product extends Component {
  render() {
    const { item } = this.props;
    return (
      <div className="ml-2">
        <div
          className="card"
          style={{
            width: "200px"
            //alignItems: "center"
          }}
        >
          <img
            className="card-img-top ml-5 mt-3"
            src={`https://storage.cloud.google.com/eraser-2bd75.appspot.com/Pencils/${
              item.image
            }?authuser=0`}
            alt="Card image cap"
            style={{
              maxWidth: "100px",
              maxHeight: "100px"
            }}
          />

          <div className="card-body" style={{}}>
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">{item.desc}</p>
            <p className="card-text">
              <b>Rs.{item.price}</b>
            </p>
            <div className="d-flex flex-rpw">
              <div className="d-flex flex-col">
                <a
                  href="#"
                  className="btn btn-primary"
                  style={{ width: "100px" }}
                >
                  Buy
                </a>
              </div>
              <div className="d-flex flex-col" style={{ margginLeft: "0" }}>
                <input
                  type="number"
                  className="form-control"
                  placeholder="1"
                  min="1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
