import React from "react";

import Table from "./components/Table.jsx";
import { store, globalBus } from "./store";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };

    globalBus.on("delItem", uid => {
      console.log(uid);
      this.deleteItem(uid);
    });

    setInterval(() => {
      this.getItems();
    }, 1000);
  }

  deleteItem = itemId => {
    const items = this.state.items.filter(i => i.uid !== itemId);
    this.setState({ items });
    fetch("http://localhost:8080/delItem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uid: itemId
      })
    });
  };

  getItems = () => {
    fetch("http://localhost:8080/getItems")
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({ items: json.data });
      })
      .catch(err => {
        console.error(err);
      });
  };

  componentWillMount() {
    this.getItems();
  }

  render() {
    return (
      <div className="container">
        <br />
        <div
          className="App"
          style={{ backgroundColor: "#F3EDDD", postion: "absolute" }}
        >
          <div className="row justify-content-center">
            <div className="col-md-12">
              <br />
              <div className="border border-dark rounded">
                <h1
                  style={{
                    textAlign: "center",
                    fontFamily: "bookman",
                    fontSize: "5vh"
                  }}
                >
                  Jack Mehof &amp; Sons Fullfilment Co.
                </h1>
                <h5
                  className="font-italic"
                  style={{
                    textAlign: "center",
                    fontFamily: "bookman",
                    fontSize: "2vh"
                  }}
                >
                  Satisfying your needs since 2:45
                </h5>
              </div>
              <br />
              <br />
              <Table items={this.state.items} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
