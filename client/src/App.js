import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./pages/shop/Homepage";
import './static/style/style.css'
import './static/style/mobile.css'
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPanel from "./pages/admin/AdminPanel";

function App() {
  return <Router>
    {/* Public */}
    <Route exact path="/">
      <Homepage />
    </Route>

    {/* Admin */}
    <Route path="/admin">
      <AdminLogin />
    </Route>
    <Route path="/panel">
      <AdminPanel selectedItem={0} />
    </Route>
  </Router>
}

export default App;
