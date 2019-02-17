import React, { Component } from 'react'
import './App.css'
import { login } from './auth'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            You are in the App!!!
          </p>
        </header>
      </div>
    )
  }

  componentDidMount() {
    login()
  }
}

export default App
