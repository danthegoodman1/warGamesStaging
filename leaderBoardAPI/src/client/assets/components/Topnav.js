import React from 'react'

/** 
 * @param content (String) message
 * @param caret (Boolean) whether the last character should have the vim caret
 * @param extraMessage (String) extra message to say
 */
export default class Topnav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            // GET URI to see what item to make active?
        }
    }

    componentDidMount() {

    }

    render() {

        if (true) {
            const sendIt = (
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                        data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand">War Games</a>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-md-0">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home
                                <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#!">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#!">Disabled</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                        </form>
                    </div>
                </nav>
            )
            return sendIt
        } else {
            const sendIt = (
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                        data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand">War Games</a>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-md-0">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home
                                <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#!">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#!">Disabled</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                        </form>
                    </div>
                </nav>
            )
            return (sendIt)
        }

    }
}
