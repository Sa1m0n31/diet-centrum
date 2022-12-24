import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./pages/shop/Homepage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPanel from "./pages/admin/AdminPanel";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css?n=1";
import './static/style/style.css'
import './static/style/mobile.css'
import {getContent} from "./helpers/api/admin";
import Contact from "./pages/shop/Contact";
import TyPage from "./pages/shop/TyPage";

const ContentContext = React.createContext({});

function App() {
  const [content, setContent] = useState({});

  useEffect(() => {
    getContent()
        .then((res) => {
            if(res?.data) {
              const r = Object.fromEntries(res.data.map((item) => ([item.field, item.value])));
              setContent(r);
            }
        });
  }, []);

  return <ContentContext.Provider value={{c: content}}>
    <Router>
      {/* Public */}
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route path="/kontakt">
        <Contact />
      </Route>
      <Route path="/dziekujemy">
        <TyPage />
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
      <Route path="/panel/edycja-tresci">
        <AdminPanel selectedItem={4} />
      </Route>
    </Router>
  </ContentContext.Provider>
}

export default App;
export { ContentContext }
