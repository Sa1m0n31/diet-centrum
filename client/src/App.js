import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import './static/style/style.css'
import './static/style/mobile.css'

function App() {
  return <Router>
    <Route path="/">
      <Homepage />
    </Route>
  </Router>
}

export default App;
