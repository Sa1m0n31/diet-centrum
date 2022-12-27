import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./pages/shop/Homepage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPanel from "./pages/admin/AdminPanel";
import {getContent} from "./helpers/api/admin";
import Contact from "./pages/shop/Contact";
import TyPage from "./pages/shop/TyPage";
import SingleProduct from "./pages/shop/SingleProduct";
import OrderProcess from "./pages/shop/OrderProcess";
import Cart from "./pages/shop/Cart";
import OfferPage from "./pages/shop/OfferPage";
import Blog from "./pages/shop/Blog";
import SingleArticle from "./pages/shop/SingleArticle";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css?n=1";
import './static/style/style.css'
import './static/style/mobile.css'

const ContentContext = React.createContext({});
const CartContext = React.createContext([]);

function App() {
  const [content, setContent] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getContent()
        .then((res) => {
            if(res?.data) {
              const r = Object.fromEntries(res.data.map((item) => ([item.field, item.value])));
              setContent(r);
            }
        });

    const cartString = localStorage.getItem('cart');
    if(cartString) {
      try {
        setCart(JSON.parse(cartString));
      }
      catch(e) {}
    }
  }, []);

  useEffect(() => {
    if(cart || cart.length === 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (id) => {
    setCart(prevState => ([...prevState, id]));
  }

  const removeFromCart = (id) => {
    setCart(prevState => (prevState.filter((item) => (item !== id))));
  }

  return <CartContext.Provider value={{
    cart,
    addToCart,
    removeFromCart
  }}>
    <ContentContext.Provider value={{c: content}}>
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
        <Route path="/produkt">
          <SingleProduct />
        </Route>
        <Route path="/koszyk">
          <Cart />
        </Route>
        <Route path="/zamowienie">
          <OrderProcess />
        </Route>
        <Route path="/oferta">
          <OfferPage />
        </Route>
        <Route exact path="/blog">
          <Blog />
        </Route>
        <Route path="/blog/*">
          <SingleArticle />
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
        <Route path="/panel/kody-rabatowe">
          <AdminPanel selectedItem={6} />
        </Route>
      </Router>
    </ContentContext.Provider>
  </CartContext.Provider>
}

export default App;
export { ContentContext, CartContext }
