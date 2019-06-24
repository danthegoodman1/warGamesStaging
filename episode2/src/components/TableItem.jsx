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
            <tr key={this.props.id}>
                <td>{this.props.name}</td>
                <td>{this.props.name}</td>
                <td>{this.props.name}</td>
                <td>
                    <button className="btn-danger" style={{borderRadius: '7px'}} onClick={this._handleClick}>X</button>
                </td>
            </tr>
        )
    }
}
