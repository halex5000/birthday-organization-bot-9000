import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Grommet} from 'grommet'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Grommet plain>
      <App />
    </Grommet>
  </React.StrictMode>
)
