import React, { Component } from 'react'
import './app.css'
import './assets/css/bootstrap4-neon-glow.css'
import Table from './assets/components/Table'
import Welcome from './assets/components/Welcome'
import Statement from './assets/components/Statement'
import Tabination from './assets/components/Tabination'
import Topnav from './assets/components/Topnav'

export default class App extends Component {
  state = {

  }

  componentDidMount() {
    console.log('ready')
  }


  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <Topnav />
          </div>
        </div>
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
            </div>
          </div>
          <div className="row justify-content-center m-4">
            <div className="col-md-8">
              <Tabination />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
