import React, {useEffect, useState} from 'react';
import {isEmail} from "../../helpers/api/others";
import Loader from "../admin/Loader";
import {sendContactForm} from "../../helpers/api/admin";
import {errorText} from "../../helpers/admin/content";

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(error) {
            setTimeout(() => {
                setError('');
            }, 2000);
        }

        if(loading) {
            setLoading(false);
        }
    }, [info, error]);

    useEffect(() => {
        if(info) {
            setName('');
            setEmail('');
            setPhoneNumber('');
            setMessage('');
        }
    }, [info]);

    const validateData = () => {
        if(!name) {
            return 'Uzupełnij swoje imię';
        }
        if(!isEmail(email)) {
            return 'Podaj poprawny adres e-mail';
        }
        if(!phoneNumber || phoneNumber.length < 8) {
            return 'Podaj poprawny numer telefonu';
        }

        return '';
    }

    const handleSubmit = () => {
        const err = validateData();

        if(!err) {
            setLoading(true);

            sendContactForm(name, email, phoneNumber, message)
                .then((res) => {
                    if(res?.status === 201) {
                        setInfo('Formularz został wysłany. Odezwę się do Ciebie najszybciej jak to możliwe!');
                    }
                    else {
                        setError(errorText);
                    }
                })
                .catch(() => {
                    setError(errorText);
                });
        }
        else {
            setError(err);
        }
    }

    return <div className="contactForm">
        <h1 className="contactForm__header">
            Formularz kontaktowy
        </h1>
        <p className="contactForm__text">
            Zostaw nam swoje dane kontaktowe w formularzu, a my oddzwonimy lub odpiszemy Ci najszybciej jak to możliwe.
        </p>

        <label className="contactForm__label">
            Imię *
            <input className="input input--contactForm"
                   value={name}
                   onChange={(e) => { setName(e.target.value); }} />
        </label>
        <label className="contactForm__label">
            Adres e-mail *
            <input className="input input--contactForm"
                   value={email}
                   onChange={(e) => { setEmail(e.target.value); }} />
        </label>
        <label className="contactForm__label">
            Nr telefonu *
            <input className="input input--contactForm"
                   value={phoneNumber}
                   onChange={(e) => { setPhoneNumber(e.target.value); }} />
        </label>
        <label className="contactForm__label">
            Treść wiadomości (opcjonalnie)
            <textarea className="input input--contactForm input--textarea"
                   value={message}
                   onChange={(e) => { setMessage(e.target.value); }} />
        </label>

        {loading ? <div className="center">
            <Loader />
        </div> : (info ? <span className="info center">
            {info}
        </span> : (error ? <span className="error center">
            {error}
        </span> : <button className="btn btn--submitContactForm"
                          onClick={() => { handleSubmit(); }}>
            Wyślij wiadomość
        </button>))}
    </div>
};

export default ContactForm;
