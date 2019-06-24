import React from 'react'

import Table from './components/Table.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [{name: 'hey', uid: '5454'}, {name: 'ho', uid: 'fwefw'}]
    }
  }

  componentDidMount() {
    fetch('http://localhost:8080/hi')
    .then((res) => {
      return res.text()
    })
    .then((text) => {
      console.log('here is fetch:')
      console.log(text)
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
