import React from "react";

import TableItem from "./TableItem.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameIn: "",
      quantIn: "",
      itemIn: ""
    };
  }

  handleChange = e => {
    let returnObj = {};
    returnObj[e.target.id] = e.target.value;
    this.setState(returnObj, () => {
      console.log(JSON.stringify(this.state));
    });
  };

  addItem = () => {
    if (
      this.state.quantIn == "" ||
      this.state.itemIn == "" ||
      this.state.nameIn == ""
    ) {
      alert("please fill in information");
      return;
    } else if (isNaN(this.state.quantIn)) {
      alert("quanity is not a number");
      this.setState({ quantIn: "" });
      return;
    }

    fetch("http://localhost:8080/addItem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.nameIn,
        quant: this.state.quantIn,
        item: this.state.itemIn
      })
    });

    this.setState({ itemIn: "", nameIn: "", quantIn: "" });
  };

  componentDidMount() {}

  render() {
    return (
      <div id="dataTable">
        <table className="table table-bordered table-striped ">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.items.map(element => (
              <TableItem
                key={element.uid}
                name={element.name}
                item={element.item}
                quant={element.quant}
                uid={element.uid}
              />
            ))}
            <tr>
              <td>
                <input
                  id="nameIn"
                  placeholder=" Name"
                  style={{ borderRadius: "5px", backgroundColor: "#E1E0DE" }}
                  onChange={this.handleChange}
                  value={this.state.nameIn}
                />
              </td>
              <td>
                <input
                  id="itemIn"
                  placeholder=" Item"
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "#E1E0DE"
                  }}
                  onChange={this.handleChange}
                  value={this.state.itemIn}
                />
              </td>
              <td>
                <input
                  id="quantIn"
                  placeholder=" Quantity"
                  style={{ borderRadius: "5px", backgroundColor: "#E1E0DE" }}
                  onChange={this.handleChange}
                  value={this.state.quantIn}
                />
              </td>
              <td>
                <button
                  className="btn-success"
                  style={{ borderRadius: "7px", marginLeft: "25%" }}
                  onClick={this.addItem}
                >
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
