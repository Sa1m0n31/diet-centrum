import React, {useContext, useEffect, useState} from 'react';
import editIcon from '../../static/img/pen.svg';
import arrowIcon from '../../static/img/arrow-white.svg';
import {CartContext} from "../../App";
import {OrderContext} from "../../pages/shop/OrderProcess";
import {getAllProducts} from "../../helpers/api/product";
import {API_URL} from "../../static/settings";
import trashIcon from "../../static/img/trash.svg";
import DiscountCodeSection from "./DiscountCodeSection";
import nextArrow from "../../static/img/arrow-white.svg";

const OrderStep3 = () => {
    const { cart, removeFromCart } = useContext(CartContext);
    const { userData, invoice, invoiceData, email, day, paperVersion, setStep } = useContext(OrderContext);

    const [cartItems, setCartItems] = useState([]);
    const [cartSum, setCartSum] = useState(0);
    const [discount, setDiscount] = useState('');

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

    const handleSubmit = () => {

    }

    return <main className="order order--1">
        <h1 className="order__header">
            3. Podsumowanie zamówienia
        </h1>

        <div className="cart__table cart__table--order">
            <div className="cart__table__header flex">
                <span className="cart__table__header__col">l.p.</span>
                <span className="cart__table__header__col">-</span>
                <span className="cart__table__header__col">Plan</span>
                <span className="cart__table__header__col">Cena</span>
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
                </div>
            })}

            <div className="cart__table__bottom flex">
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

        <div className="clientData">

        </div>

        <div className="cart__bottom cart__bottom--order cart__bottom--order--3 flex">
            <button className="btn btn--closeModal btn--nextToHandleSubmitOrder"
                    onClick={() => { setStep(0); }}>
                Wróć
            </button>
            <button className="btn btn--goToCart btn--handleSubmitOrder"
                    onClick={() => { handleSubmit(); }}>
                Zamawiam i płacę
                <img className="img" src={nextArrow} alt="dalej" />
            </button>
        </div>
    </main>
};

export default OrderStep3;
