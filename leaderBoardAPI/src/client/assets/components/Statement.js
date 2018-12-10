import React from 'react'

/** 
 * @param content (String) message
 * @param caret (Boolean) whether the last character should have the vim caret
 * @param extraMessage (String) extra message to say
 */
export default class Statement extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {

        const { content, caret, extraMessage } = this.props

        if (caret) {
            return (
                <div className="jumbotron">
                    <h1 className="display-1" style={{textAlign: 'center'}}>{content.slice(0, content.length - 1)}<span className="vim-caret">{content.substr(-1)}</span></h1>
                    <hr className="my-4"/>
                    {extraMessage && <p className="lead" style={{textAlign: 'center'}}>{extraMessage}</p>}
                    {/* <br></br>
                    <h1 className="display-3" style={{textAlign: 'right'}}>UD War Games</h1>
                    <br></br>
                    <p className="lead">The goal is simple. Build up your defenses, and tear everyone else's down.</p>
                    <hr className="my-4"/>
                    <p>Games are played in Episodes, and the winners come out on top to win some bangin' prizes</p>
                    <p className="lead">
                        <a className="btn btn-primary" href="/rules" role="button">Learn more</a>
                    </p> */}
                </div>
            )
        } else {
            return (
                <div className="jumbotron">
                    <h1 className="display-1" style={{textAlign: 'center'}}>{content}</h1>
                    <hr className="my-4"/>
                    {extraMessage && <p className="lead" style={{textAlign: 'center'}}>{extraMessage}</p>}
                    {/* <br></br>
                    <h1 className="display-3" style={{textAlign: 'right'}}>UD War Games</h1>
                    <br></br>
                    <p className="lead">The goal is simple. Build up your defenses, and tear everyone else's down.</p>
                    <hr className="my-4"/>
                    <p>Games are played in Episodes, and the winners come out on top to win some bangin' prizes</p>
                    <p className="lead">
                        <a className="btn btn-primary" href="/rules" role="button">Learn more</a>
                    </p> */}
                </div>
            )
        }
    }
}
