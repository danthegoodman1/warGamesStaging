import auth0 from 'auth0-js';
import quertyString from 'query-string'
import history from './history'

export default class Auth {

  accessToken;
  idToken;
  expiresAt;
  profile;

  auth0 = new auth0.WebAuth({
    domain: 'udwargames.auth0.com',
    clientID: 'sy7XLoi84pzt8W7ktC6HAtr7yWRSfZDg',
    redirectUri: 'http://udwargames.com/callback',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  login() {
    this.auth0.authorize();
  }

  state = {
    
  }

  getProfile() {
    console.log('getting profile')
    if (this.accessToken) {
      this.auth0.client.userInfo(this.accessToken, (err, profile) => {
        if (err) reject(err)
        console.log(`a prof: ${JSON.stringify(profile)}`)
        this.profile = profile
      })
    }
  }

  fetchMeProf() {
    return new Promise((resolve, reject) => {
      console.log('fetching profile')
      if (this.accessToken) {
        this.auth0.client.userInfo(this.accessToken, (err, profile) => {
          if (err) reject(err)
          console.log(`a fetched prof: ${JSON.stringify(profile)}`)
          resolve(profile)
        })
      }
    })
  }

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }


  handleAuthentication() {
    console.log('handling auth')
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        // history.replace('/')
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
        console.log(authResult)
      }
    })
    // this.setSession({
    //   accessToken: this.getAccessToken(),
    //   idToken: this.getIdToken(),
    //   expiresIn: this.getExpires() + 60000
    // })
  }

  getAccessToken() {
    return quertyString.parse(location.search).access_token || false
  }

  getIdToken() {
    return quertyString.parse(location.search).id_token
  }

  getExpires() {
    return quertyString.parse(location.search).expires_in
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    this.getProfile()

    // navigate to the home route
    history.replace('/');
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         console.log('renewing session')
         this.setSession(authResult)
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
    // this.setSession({
    //   accessToken: this.getAccessToken(),
    //   idToken: this.getIdToken(),
    //   expiresIn: new Date().getTime() + 60000
    // })
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    this.profile = null

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    // navigate to the home route
    // history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}
