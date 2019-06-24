import React from 'react'

import Table from './components/Table.jsx'
import {store, globalBus} from './store'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }

        globalBus.on('delItem', (uid) => {
            console.log(uid)
        })
    }

    deleteItem() {

    }

    componentWillMount() {
        fetch('http://localhost:8080/getItems')
        .then((res) => {
            return res.json()
        })
        .then((json) => {
            console.log('here is fetch:')
            console.log(JSON.stringify(json))
            this.setState({items: json.items})
        })
        .catch((err) => {
            console.error(err)
        })
    }

    render(){
        return (
        <div className="App">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <Table items={this.state.items} />
                </div>
            </div>
        </div>
        )
    }
}
