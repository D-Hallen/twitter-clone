import React from 'react'
import ReactDOM from 'react-dom/client'

import {Pages} from './pages'
import "./assets/styles/index.css"
import { connect } from "./utils/firebase";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Pages app={connect()} />
  </React.StrictMode>,
)
