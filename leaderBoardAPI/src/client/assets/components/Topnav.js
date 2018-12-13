import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Auth from './Auth'
import history from './history'
import { observer } from 'mobx-react'
import sample from './sampleStore'

const auth = new Auth()

/** 
 * @param content (String) message
 * @param caret (Boolean) whether the last character should have the vim caret
 * @param extraMessage (String) extra message to say
 */
const Topnav = observer(class Topnav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            setProfile: false
        }
    }

    componentDidMount() {
        // if (localStorage.getItem('isLoggedIn') === 'true') {
        //     auth.renewSession()
        // }
        auth.handleAuthentication()
        // auth.renewSession()

        this.interval = setInterval(() => {
            if (auth.profile) {
                if (!this.state.setProfile) {
                    this.setState({profile: auth.profile, setProfile: true})
                }
            } else {
            }
        }, 100)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    goSignIn() {
        auth.login()
        this.setState({setProfile: false})
    }

    signOut() {
        auth.logout()
        this.setState({setProfile: false, profile: false})
        history.push('/')
    }

    render() {

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
                    { this.state.setProfile && this.state.profile && <a onClick={this.signOut.bind(this)} className="btn btn-primary">
                        Sign out, {this.state.profile.nickname} <FontAwesomeIcon icon="user" />
                    </a> }
                    { !this.state.setProfile && <a onClick={this.goSignIn.bind(this)} className="btn btn-primary">
                        Sign in <FontAwesomeIcon icon="sign-in-alt" />
                    </a> }
                </div>
                <p>{store.theStore[0]}</p>
            </nav>
        )
        return sendIt

    }
})

export default Topnav
