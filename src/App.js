import React, { useState, useEffect } from 'react'
import './App.css'
import {
  login,
  logout,
  isAuthenticated,
  handleAuthentication,
  renewSession
} from './auth'
import { Content } from './Content'
import { LoggedOut } from './LoggedOut'
import { isCallback } from './isCallback'

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
