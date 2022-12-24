import React, {useContext} from 'react';
import phoneIcon from '../../static/img/phone.svg';
import mailIcon from '../../static/img/mail.svg';
import {ContentContext} from "../../App";

const ContactData = () => {
    const { c } = useContext(ContentContext);

    return <div className="contact__data">
        <h2 className="contactForm__header">
            Dane kontaktowe
        </h2>
        <p className="contactForm__text">
            Możesz też skontaktować się z nami bezpośrednio, używając do tego poniższego numeru telefonu lub adresu mailowego.
        </p>

        <a className="contact__data__item" href={`tel:${c?.phoneNumber?.replace(' ', '')}`}>
            <figure className="center">
                <img className="img" src={phoneIcon} alt="telefon" />
            </figure>
            <span>
                tel: {c.phoneNumber}
            </span>
        </a>
        <a className="contact__data__item" href={`mailto:${c.email}`}>
            <figure className="center">
                <img className="img" src={mailIcon} alt="telefon" />
            </figure>
            <span>
                mail: {c.email}
            </span>
        </a>

        <h3 className="contactData__secondHeader">
            Rozpocznij swoją przemianę już dziś
        </h3>
        <p className="contactData__secondText">
            Możesz również przejść bezpośrednio do <a href="/oferta">sklepu</a> i tam zamówić jeden z dostępnych planów żywieniowych.
        </p>
    </div>
};

export default ContactData;
