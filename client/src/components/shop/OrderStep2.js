import React, {useContext, useEffect, useState} from 'react';
import downloadIcon from '../../static/img/download.svg';
import uploadIcon from '../../static/img/add.svg';
import {OrderContext} from "../../pages/shop/OrderProcess";
import OrderCalendar from "./OrderCalendar";
import nextArrow from "../../static/img/arrow-white.svg";
import checkIcon from '../../static/img/check-green.svg';
import {isEmail, scrollToTop} from "../../helpers/api/others";

const OrderStep2 = () => {
    const { day, setDay, email, setEmail, attachment, setAttachment, setStep } = useContext(OrderContext);

    const [errors, setErrors] = useState([]);

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

    const handleAttachmentUpload = (files) => {
        let file = files[0];
        if(file) {
            setAttachment(file);
        }
    }

    const validateData = () => {
        let err = [];

        if(day === null) err.push('day');
        if(!isEmail(email)) err.push('email');
        if(!attachment) err.push('attachment');

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
        <h1 className="order__header">
            2. Wysyłka planu
        </h1>

        <div className="order__section">
            <h3 className={errors.includes('day') ? "order__section__header red" : "order__section__header"}>
                Wybierz dzień wysyłki Twojego planu żywieniowego
            </h3>

            <OrderCalendar selected={day}
                           setSelected={setDay}
                           numberOfDays={15}
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
            </h3>

            <a download="" target="_blank" className="btn btn--download center">
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
                        Załącznik został dodany
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
    </main>
};

export default OrderStep2;
