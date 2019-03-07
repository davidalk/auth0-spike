import React, { useState, useEffect } from 'react'
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

const Content = ({ handleLogout }) => (
  <div>
    <p>You are in the App!!!</p>
    <button onClick={() => handleLogout()}>Logout</button>
  </div>
)

const LoggedOut = () => (<div>You are not logged in!!!!</div>)

const App = () => {

  const [authenticated, setAuthenticated] = useState(false)

  const handleLogout = () => {
    logout()
    setAuthenticated(false)
  }

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession().then(() => {
         setAuthenticated(isAuthenticated())
      })
      console.log('logged in')
    } else {
      console.log('not logged in')
      if (isCallback()) {
        handleAuthentication().then(() => {
          setAuthenticated(isAuthenticated())
        })
      } else {
        login()
      }
    }
    setAuthenticated(isAuthenticated())
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {authenticated ?
          <Content handleLogout={handleLogout} /> : <LoggedOut />}
      </header>
    </div>
  )
}

export default App
