import React from 'react'


export default class Welcome extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="jumbotron">
                <h1 className="display-2">Welcome to the Gam<span className="vim-caret">e</span></h1>
                <br></br>
                <br></br>
                <h1 className="display-3" style={{textAlign: 'right'}}>UD War Games</h1>
                <br></br>
                <br></br>
                <p className="lead">The goal is simple. Build up your defenses, and tear everyone else's down.</p>
                <hr className="my-4"/>
                <p>Games are played in Episodes, and the winners come out on top to win some bangin' prizes</p>
                <p className="lead">
                    <a className="btn btn-primary" href="/rules" role="button">Learn more</a>
                </p>
            </div>
        )
    }
}
