import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    fetch('/hi')
    .then((res) => {
      return res.text()
    })
    .then((text) => {
      console.log(text)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}
