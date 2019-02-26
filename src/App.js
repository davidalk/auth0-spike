import React, { Component } from 'react'
import './App.css'
import {
  login,
  logout,
  isAuthenticated,
  handleAuthentication,
  renewSession
} from './auth'


const isCallback = () => {
  const hash = window.location.hash
  return (/access_token|id_token|error/.test(hash))
}

const Content = ({handleLogout}) => (
  <div>
    <p>You are in the App!!!</p>
    <button onClick={() => handleLogout()}>Logout</button>
  </div>
)

const LoggedOut = () => (<div>You are not logged in!!!!</div>)

class App extends Component {
  constructor(props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)

    this.state = {
      authenticated: false
    }
  }

  handleLogout() {
    logout()
    this.setState({authenticated: false})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.authenticated ? 
          <Content handleLogout={this.handleLogout}/> : <LoggedOut/>}
        </header>
      </div>
    )
  }

  componentDidMount() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession().then(() => {
        this.setState({authenticated: isAuthenticated()})
      })
      console.log('logged in')
    } else {
      console.log('not logged in')
      if (isCallback()) { 
        handleAuthentication().then(() => {
          this.setState({authenticated: isAuthenticated()})
        })
      } else {
        login()
      }
    }
    this.setState({authenticated: isAuthenticated()})
  }

}

export default App
