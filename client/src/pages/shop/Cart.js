import React, {useContext, useEffect, useState} from 'react';
import SiteHeader from "../../components/shop/SiteHeader";
import Footer from "../../components/shop/Footer";
import {CartContext} from "../../App";
import {getAllProducts} from "../../helpers/api/product";
import EmptyCart from "../../components/shop/EmptyCart";
import DiscountCodeSection from "../../components/shop/DiscountCodeSection";
import arrowWhite from '../../static/img/arrow-white.svg';
import {API_URL} from "../../static/settings";
import trashIcon from '../../static/img/trash.svg';

const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext);

    const [cartItems, setCartItems] = useState([]);
    const [cartSum, setCartSum] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        if(cart.length) {
            getAllProducts()
                .then((res) => {
                    if(res.status === 200) {
                        setCartItems(res.data.filter((item) => {
                            return cart.includes(item.id);
                        }));
                    }
                });
        }
    }, [cart]);

    useEffect(() => {
        setCartSum(cartItems.reduce((prev, curr) => {
            return prev + curr.price;
        }, 0));
    }, [cartItems]);

    return <div className="container container--cart">
        <SiteHeader />

        <main className="cart w">
            {cart?.length ? <>
                <h1 className="section__header">
                    Podsumowanie koszyka
                </h1>

                <div className="cart__table">
                    <div className="cart__table__header flex">
                        <span className="cart__table__header__col">l.p.</span>
                        <span className="cart__table__header__col">-</span>
                        <span className="cart__table__header__col">Plan</span>
                        <span className="cart__table__header__col">Cena</span>
                        <span className="cart__table__header__col">Usuń</span>
                    </div>

                    {cartItems.map((item, index) => {
                        return <div className="cart__table__item flex"
                                    key={index}>
                            <span className="cart__table__item__col">
                                {index+1}.
                            </span>
                            <span className="cart__table__item__col">
                                <img className="img" src={`${API_URL}/${item.image}`} alt={item.title} />
                            </span>
                                <span className="cart__table__item__col">
                                {item.title}
                            </span>
                            <span className="cart__table__item__col">
                                {item.price} zł
                            </span>
                            <span className="cart__table__item__col">
                                <button className="btn btn--deleteFromCart"
                                        onClick={() => { removeFromCart(item.id); }}>
                                    <img className="img" src={trashIcon} alt="usuń" />
                                </button>
                            </span>
                        </div>
                    })}

                    <div className="cart__table__bottom flex">
                        <DiscountCodeSection setCartSum={setCartSum}
                                             cartSum={cartSum}
                                             discountCode={discountCode}
                                             setDiscount={setDiscount}
                                             setDiscountCode={setDiscountCode} />

                        <div className="cart__table__bottom__right">
                            {discount ? <h4 className="cart__table__bottom__sum cart__table__bottom__sum--discount">
                                Rabat: <span>-{discount} zł</span>
                            </h4> : ''}
                            <h4 className="cart__table__bottom__sum">
                                Łącznie do zapłaty: <span>{cartSum} zł</span>
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="cart__bottom flex">
                    <a href="/oferta" className="btn btn--closeModal">
                        Kontynuuj zakupy
                    </a>
                    <a href="/zamowienie" className="btn btn--goToCart">
                        Przejdź dalej
                        <img className="img" src={arrowWhite} alt="dalej" />
                    </a>
                </div>
            </> : <EmptyCart />}
        </main>

        <Footer />
    </div>
};

export default Cart;
