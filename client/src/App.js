import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./pages/shop/Homepage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPanel from "./pages/admin/AdminPanel";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css?n=1";
import './static/style/style.css'
import './static/style/mobile.css'

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
    <Route exact path="/panel">
      <AdminPanel selectedItem={0} />
    </Route>
    <Route path="/panel/lista-produktow">
      <AdminPanel selectedItem={1} page={0} />
    </Route>
    <Route path="/panel/edycja-produktu">
      <AdminPanel selectedItem={1} page={1} />
    </Route>
  </Router>
}

export default App;
