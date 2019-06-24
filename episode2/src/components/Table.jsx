import React from 'react'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        
    }

    _handleClick = () => {
        console.log('hey')
        fetch('http://localhost:8080/hi')
        .then((res) => {
            if (res.status < 300 && res.status >= 200) {
                console.log('good')
            } else {
                console.log('bad')
            }
        })
        .catch((json) => {
        })
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
                        <tr key={element.uid}>
                            <td>{element.name}</td>
                            <td>{element.name}</td>
                            <td>{element.name}</td>
                            <td>
                                <button className="btn-danger" style={{borderRadius: '7px'}} onClick={this._handleClick}>X</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )
    }
}
