import React from 'react';
import ReactDOM from 'react-dom';
import './css/custom.css';
import './css/bootstrap.min.css'

class App extends React.Component{
    render(){
        return(
            <div>Hello World</div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
