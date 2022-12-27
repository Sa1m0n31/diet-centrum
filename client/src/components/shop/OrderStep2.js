import React, {useContext} from 'react';
import downloadIcon from '../../static/img/download.svg';
import uploadIcon from '../../static/img/add.svg';
import {OrderContext} from "../../pages/shop/OrderProcess";
import OrderCalendar from "./OrderCalendar";
import nextArrow from "../../static/img/arrow-white.svg";
import trashIcon from '../../static/img/trash.svg';
import checkIcon from '../../static/img/check-green.svg';

const OrderStep2 = () => {
    const { day, setDay, email, setEmail, attachment, setAttachment, setStep } = useContext(OrderContext);

    const handleAttachmentUpload = (files) => {
        let file = files[0];
        if(file) {
            setAttachment(file);
        }
    }

    return <main className="order order--2">
        <h1 className="order__header">
            2. Wysyłka planu
        </h1>

        <div className="order__section">
            <h3 className="order__section__header">
                Wybierz dzień wysyłki Twojego planu żywieniowego
            </h3>

            <OrderCalendar day={day}
                           setDay={setDay} />
        </div>

        <div className="order__section">
            <h3 className="order__section__header">
                Adres e-mail, na który zostanie wysłany plan:
            </h3>

            <input className="input input--order input--email"
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

            <label className="uploadAttachmentLabel">
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
                    onClick={() => { setStep(2); }}>
                Przejdź dalej
                <img className="img" src={nextArrow} alt="dalej" />
            </button>
        </div>
    </main>
};

export default OrderStep2;
