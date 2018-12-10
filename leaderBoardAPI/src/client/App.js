import React, { Component } from 'react'
import './assets/css/bootstrap4-neon-glow.css'
import Table from './assets/components/Table'
import Welcome from './assets/components/Welcome'
import Statement from './assets/components/Statement'

export default class App extends Component {
  state = {

  }

  componentDidMount() {
    console.log('ready')
  }

  exampleGuys = [
    {
      num: 3,
      fn: 'dan',
      ln: 'goodman',
      un: 'danthegoodman'
    },
    {
      num: 4,
      fn: 'fan',
      ln: 'foodman',
      un: 'fanthefoodman'
    }
  ]

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center m-4">
          <div className="col-md-12">
            <Welcome />
          </div>
        </div>
        <div className="row justify-content-center m-4">
          <div className="col-md-8">
            <Statement content="Upcoming" extraMessage="Episode 1: The Wrapping of Cats"/>
          </div>
        </div>
        <div className="row justify-content-center m-4">
          <div className="col-md-8">
            <Table items={this.exampleGuys}/>
          </div>
        </div>
      </div>
    )
  }
}
