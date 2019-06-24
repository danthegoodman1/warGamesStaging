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

        setInterval(() => {
            this.getItems()
        }, 1000)
    }

    deleteItem = () => {

    }

    getItems = () => {
        fetch('http://localhost:8080/getItems')
        .then((res) => {
            return res.json()
        })
        .then((json) => {
            this.setState({items: json.data})
        })
        .catch((err) => {
            console.error(err)
        })
    }

    componentWillMount() {
        this.getItems()
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
