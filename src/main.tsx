import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Grommet} from 'grommet'
import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Grommet theme={theme} full>
      <App />
    </Grommet>
  </React.StrictMode>
)
