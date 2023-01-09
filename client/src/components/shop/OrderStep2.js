import React, {useContext, useEffect, useState} from 'react';
import downloadIcon from '../../static/img/download.svg';
import uploadIcon from '../../static/img/add.svg';
import {OrderContext} from "../../pages/shop/OrderProcess";
import OrderCalendar from "./OrderCalendar";
import nextArrow from "../../static/img/arrow-white.svg";
import checkIcon from '../../static/img/check-green.svg';
import {getAmountInArray, isEmail, scrollToTop} from "../../helpers/api/others";
import {API_URL} from "../../static/settings";
import {CartContext, ContentContext} from "../../App";
import {getAllProducts} from "../../helpers/api/product";
import {verifyDiscountCode} from "../../helpers/api/code";

const OrderStep2 = () => {
    const { c } = useContext(ContentContext);
    const { cart } = useContext(CartContext);
    const { day, setDay, email, setEmail, attachment, setAttachment, paperVersion, datePrice, setDatePrice,
        setStep } = useContext(OrderContext);

    const [errors, setErrors] = useState([]);
    const [attachmentName, setAttachmentName] = useState('');
    const [attachmentToDownloadName, setAttachmentToDownloadName] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [cartSum, setCartSum] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        if(c?.attachmentPath) {
            setAttachmentToDownloadName(c.attachmentPath.split('/').slice(-1)[0]);
        }
    }, [c]);

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
        if(cartItems?.length && datePrice !== undefined) {
            setCartSum(cartItems.reduce((prev, curr) => {
                return prev + curr.price;
            }, 0) + (paperVersion ? 5 : 0) + datePrice - discount);
        }
    }, [cartItems, paperVersion, datePrice, discount]);

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
        if(day !== null) {
            setErrors(prevState => (prevState.filter((item) => (item !== 'day'))));
        }
    }, [day]);

    useEffect(() => {
        if(isEmail(email)) {
            setErrors(prevState => (prevState.filter((item) => (item !== 'email'))));
        }
    }, [email]);

    useEffect(() => {
        if(attachment) {
            setErrors(prevState => (prevState.filter((item) => (item !== 'attachment'))));
        }
    }, [attachment]);

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

    const handleAttachmentUpload = (files) => {
        let file = files[0];
        if(file) {
            setAttachmentName(file.name.length > 50 ? `${file.name.substring(0, 50)}...` : file.name);
            setAttachment(file);
        }
    }

    const validateData = () => {
        let err = [];

        if(day === null) err.push('day');
        if(!isEmail(email)) err.push('email');

        setErrors(err);
        return err.length === 0;
    }

    const nextStep = () => {
        if(validateData()) {
            setStep(2);
        }
        else {
            scrollToTop();
        }
    }

    return <main className="order order--2">
        <div className="order__stickyInfo">
            <div className="cart__table__bottom__right">
                <h4 className="cart__table__bottom__sum cart__table__bottom__sum--discount">
                    Wartość zamówienia{discount ? ' (po rabacie):' : ':'} <span>{cartSum - (paperVersion ? 5 : 0) - datePrice} zł</span>
                </h4>
                {paperVersion ? <h4 className="cart__table__bottom__sum cart__table__bottom__sum--discount">
                    Wersja papierowa: <span>5 zł</span>
                </h4> : ''}
                <h4 className="cart__table__bottom__sum cart__table__bottom__sum--discount">
                    Opłata za ekspresową usługę: <span>{datePrice ? '+' : ''}{datePrice} zł</span>
                </h4>
                {discount ? <h4 className="cart__table__bottom__sum cart__table__bottom__sum--discount">
                    Rabat: <span>-{discount} zł</span>
                </h4> : ''}
                <h4 className="cart__table__bottom__sum">
                    Łącznie do zapłaty: <span>{cartSum} zł</span>
                </h4>
            </div>
        </div>

        <div className="order--2__main">
            <h1 className="order__header">
                2. Wysyłka planu
            </h1>

            <div className="order__section">
                <h3 className={errors.includes('day') ? "order__section__header red" : "order__section__header"}>
                    Wybierz dzień wysyłki Twojego planu żywieniowego
                </h3>

                <OrderCalendar selected={day}
                               setSelected={setDay}
                               setDatePrice={setDatePrice}
                               numberOfDays={60}
                               offset={2} />
            </div>

            <div className="order__section">
                <h3 className="order__section__header">
                    Adres e-mail, na który zostanie wysłany plan:
                </h3>

                <input className={errors.includes('email') ? "input input--order input--email input--error" : "input input--order input--email"}
                       value={email}
                       onChange={(e) => { setEmail(e.target.value); }} />
            </div>

            <div className="order__section">
                <h3 className="order__section__header">
                    <span className="bold">Ważne:</span> pobierz formularz, który należy wypełnić i dołączyć do zamówienia w formie załącznika.
                    Możesz również przesłać formularz później, na adres mailowy kontakt@diet-centrum.pl, jednak opóźnienie w wysłaniu formularza będzie
                    wiązało się z opóźnieniem w otrzymaniu planu.
                </h3>

                <a href={`${API_URL}/uploads/attachmentToDownload/${attachmentToDownloadName}`}
                   download="ankieta.pdf"
                   target="_blank"
                   className="btn btn--download center">
                    Pobierz formularz
                    <img className="img" src={downloadIcon} alt="pobierz" />
                </a>
            </div>

            <div className="order__section">
                <h3 className="order__section__header">
                    Miejsce na Twój załącznik
                </h3>

                <label className={errors.includes('attachment') ? "uploadAttachmentLabel uploadAttachmentLabel--error" : "uploadAttachmentLabel"}>
                    {!attachment ? <span>
                    Dodaj plik
                    <img className="img" src={uploadIcon} alt="dodaj" />
                </span> :  <span>
                        <img className="img img--check" src={checkIcon} alt="dodano" />
                        {attachmentName}
                    </span>}
                    <input className="input input--file"
                           type="file"
                           onChange={(e) => { handleAttachmentUpload(e.target.files); }} />
                </label>
            </div>

            <div className="cart__bottom cart__bottom--order flex">
                <button className="btn btn--closeModal"
                        onClick={() => { setStep(0); }}>
                    Wróć
                </button>
                <button className="btn btn--goToCart"
                        onClick={() => { nextStep(); }}>
                    Przejdź dalej
                    <img className="img" src={nextArrow} alt="dalej" />
                </button>
            </div>
        </div>
    </main>
};

export default OrderStep2;
