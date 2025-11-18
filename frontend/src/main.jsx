import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { initializeCsrf } from './api'

initializeCsrf().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
});