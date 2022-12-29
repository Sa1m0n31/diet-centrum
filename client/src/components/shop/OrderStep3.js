import React, {useContext, useEffect, useRef, useState} from 'react';
import {CartContext} from "../../App";
import {OrderContext} from "../../pages/shop/OrderProcess";
import {getAllProducts} from "../../helpers/api/product";
import {API_URL, PAYMENT_PAGE_URL} from "../../static/settings";
import nextArrow from "../../static/img/arrow-white.svg";
import penIcon from '../../static/img/pen.svg';
import {getAmountInArray, getNextNDays, getStringDate} from "../../helpers/api/others";
import {addPurchase} from "../../helpers/api/purchase";
import {errorText} from "../../helpers/admin/content";
import {verifyDiscountCode} from "../../helpers/api/code";
import Loader from "../admin/Loader";

const OrderStep3 = () => {
    const { cart } = useContext(CartContext);
    const { userData, invoice, invoiceData, email, day, paperVersion, setStep, attachment } = useContext(OrderContext);

    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartSum, setCartSum] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const [discount, setDiscount] = useState('');
    const [sendPlanDate, setSendPlanDate] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    let buttonsSection = useRef(null);
    let loader = useRef(null);

    const nextDays = getNextNDays(15, 2);

    useEffect(() => {
        getAllProducts()
            .then((res) => {
                if(res?.status === 200) {
                    setProducts(res.data);
                }
            });
    }, []);

    useEffect(() => {
        setSendPlanDate(nextDays[day]);
    }, [day]);

    useEffect(() => {
        if(cart.length) {
            getAllProducts()
                .then((res) => {
                    if(res.status === 200) {
                        setCartItems(res.data.filter((item) => {
                            return cart.includes(item.id);
                        }).map((item) => {
                            let currentItemAmounts = [];
                            let n = getAmountInArray(item.id, cart);

                            for(let i=0; i<n; i++) {
                                currentItemAmounts.push(item);
                            }

                            return currentItemAmounts;
                        }).flat());
                    }
                });
        }
    }, [cart]);

    useEffect(() => {
        if(cartItems?.length) {
            setCartSum(cartItems.reduce((prev, curr) => {
                return prev + curr.price;
            }, 0) + (paperVersion ? 5 : 0));
        }
    }, [cartItems, paperVersion]);

    useEffect(() => {
        if(cartSum && !discountCode) {
            // Verify discount code
            const code = localStorage.getItem('discountCode');
            if(code) {
                verifyDiscountCode(code)
                    .then((res) => {
                        if(res.status === 200) {
                            setDiscountCode(code);
                            const codeObject = res.data;
                            calculateNewCartSum(codeObject.discount_type, codeObject.discount_value);
                        }
                    });
            }
        }
    }, [cartSum]);

    useEffect(() => {
        if(loading) {
            loader.current.style.zIndex = '3';
            buttonsSection.current.style.opacity = '0';
            loader.current.style.opacity = '1';
        }
        else {
            buttonsSection.current.style.opacity = '1';
            loader.current.style.opacity = '0';
            setTimeout(() => {
                if(loader?.current) {
                    loader.current.style.zIndex = '-3';
                }
            }, 200);
        }
    }, [loading]);

    const calculateNewCartSum = (type, value) => {
        if(type === 0) {
            setDiscount(value);
            setCartSum(prevState => (Math.max(0, prevState - value)));
        }
        else {
            const d = (cartSum * (value / 100)).toFixed();
            setDiscount(d);
            setCartSum(prevState => (Math.max(0, prevState - d)));
        }
    }

    const getProductPriceById = (id) => {
        return products.find((item) => (item.id === id))?.price || 0;
    }

    const handleSubmit = () => {
        const sendDateObject = nextDays[day];
        const sendDate = JSON.stringify(sendDateObject);
        localStorage.setItem('orderReceivedDate', getStringDate(sendDateObject.day, sendDateObject.monthNumber, sendDateObject.year));
        setLoading(true);

        const cartWithPrices = cart.map((item) => {
           return {
               id: item,
               price: getProductPriceById(item)
           }
        });

        addPurchase(cartWithPrices, userData, invoice ? invoiceData : null,
            email, sendDate, paperVersion,
            discountCode, discount, cartSum, attachment)
            .then((res) => {
                if(!res) {
                    setError(errorText);
                }
                else {
                    localStorage.removeItem('cart');
                    localStorage.removeItem('discountCode');

                    // Redirect to payment page
                    const token = res.data.token;
                    window.location = `${PAYMENT_PAGE_URL}${token}`;
                }
            })
            .catch((e) => {
                setError(errorText);
                setLoading(false);
            });
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
            <div className="clientData__section">
                <h5 className="clientData__section__header">
                    Dane Klienta:
                </h5>
                <span className="clientData__section__data">
                    {userData.firstName} {userData.lastName}
                </span>
                <span className="clientData__section__data">
                    {userData.street} {userData.building}{userData.flat ? `/${userData.flat}` : ''}, {userData.postalCode} {userData.city}
                </span>
                <span className="clientData__section__data">
                    tel. {userData.phoneNumber}
                </span>
                <span className="clientData__section__data">
                    {userData.email}
                </span>
            </div>

            <div className="clientData__section">
                <h5 className="clientData__section__header">
                    Mail do wysyłki planu:
                </h5>
                <span className="clientData__section__data">
                    {email}
                </span>
            </div>

            <div className="clientData__section">
                <h5 className="clientData__section__header">
                    Wersja papierowa planu (+5 zł):
                </h5>
                <span className="clientData__section__data">
                    {paperVersion ? 'TAK' : 'NIE'}
                </span>
            </div>

            <div className="clientData__section">
                <h5 className="clientData__section__header">
                    Sposób płatności:
                </h5>
                <span className="clientData__section__data">
                    Płatność online z Przelewy24
                </span>
            </div>

            <div className="clientData__section">
                <h5 className="clientData__section__header">
                    Dzień wysyłki:
                </h5>
                <span className="clientData__section__data">
                    {getStringDate(sendPlanDate.day, sendPlanDate.monthNumber, sendPlanDate.year)}
                </span>
            </div>

            <button className="btn btn--editOrderData"
                    onClick={() => { setStep(0); }}>
                Edytuj dane
                <img className="img" src={penIcon} alt="edytuj" />
            </button>
        </div>

        <div className="cart__bottom cart__bottom--order cart__bottom--order--3 flex">
            <div className="center orderLoader"
                 ref={loader}>
                <Loader />
            </div>

            <div className="flex orderButtons"
                 ref={buttonsSection}>
                <button className="btn btn--closeModal btn--nextToHandleSubmitOrder"
                        onClick={() => { setStep(1); }}>
                    Wróć
                </button>
                <button className="btn btn--goToCart btn--handleSubmitOrder"
                        onClick={() => { handleSubmit(); }}>
                    Zamawiam i płacę
                    <img className="img" src={nextArrow} alt="dalej" />
                </button>
            </div>
        </div>

        {error ? <span className="error error--order">
            {error}
        </span> : ''}
    </main>
};

export default OrderStep3;
