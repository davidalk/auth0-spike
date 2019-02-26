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

const Content = () => (
  <div>
    <p>You are in the App!!!</p>
    <button onClick={() => logout()}>Logout</button>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authenticated: false
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.authenticated && <Content/>}
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
