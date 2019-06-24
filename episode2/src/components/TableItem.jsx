import React from 'react'

import {store, globalBus} from '../store'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        
    }

    _handleClick = () => {
        globalBus.emit('delItem', this.props.uid)
    }

    render(){
        return (
            <tr>
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
