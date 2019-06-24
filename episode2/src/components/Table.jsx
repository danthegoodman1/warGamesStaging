import React from 'react'

import TableItem from './TableItem.jsx'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
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
                        <TableItem key={element.uid} uid={element.uid} name={element.name} />
                    ))}
                </tbody>
            </table>
        </div>
        )
    }
}
