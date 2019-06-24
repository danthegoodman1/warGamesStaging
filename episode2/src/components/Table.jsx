import React from 'react'

import TableItem from './TableItem.jsx'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleChange = (e) => {
        let returnObj = {}
        returnObj[e.target.id] = e.target.value
        this.setState(returnObj, () => {
          console.log(JSON.stringify(this.state))
        })
    }

    addItem = () => {
        fetch('http://localhost:8080/addItem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: this.state.nameIn, quant: this.state.quantIn})
        })
        this.setState({itemIn: '', nameIn: '', quantIn: ''})
    }

    componentDidMount() {
        
    }

    render(){
        return (
        <div id="dataTable">
            <table className="table">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                    {this.props.items.map((element) => (
                        <TableItem key={element.uid} name={element.name} item={element.item} quant={element.quant} />
                    ))}
                    <tr>
                        <td><input id="nameIn" placeholder="Name" style={{borderRadius: '5px'}} onChange={this.handleChange} value={this.state.nameIn}></input></td>
                        <td><input id="itemIn" placeholder="Item" style={{borderRadius: '5px'}} onChange={this.handleChange} value={this.state.itemIn}></input></td>
                        <td><input id="quantIn" placeholder="Quantity" style={{borderRadius: '5px'}} onChange={this.handleChange} value={this.state.quantIn}></input></td>
                        <td><button className="btn-success" style={{borderRadius: '7px'}} onClick={this.addItem}>Add</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        )
    }
}
