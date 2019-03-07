import React from 'react'

export const Content = ({ handleLogout }) => (
    <div>
      <p>You are in the App!!!</p>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  )