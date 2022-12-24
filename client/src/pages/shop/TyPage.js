import React, {useEffect, useState} from 'react';
import successIcon from '../../static/img/ty-icon.svg';
import SiteHeader from "../../components/shop/SiteHeader";
import Footer from "../../components/shop/Footer";

const TyPage = () => {
    const [receivedDate, setReceivedDate] = useState('');

    useEffect(() => {
        const date = localStorage.getItem('orderReceivedDate') || '10 grudnia 2022';
        setReceivedDate(date);
    }, []);

    return <div className="container container--ty">
        <SiteHeader />

        <main className="ty">
            <img className="img img--ty" src={successIcon} alt="sukces" />

            <h1 className="ty__header">
                Dziękujemy za złożenie zamówienia
            </h1>
            <h2 className="ty__text">
                Twoja przemiana rozpocznie się <span className="ty__text__date">{receivedDate}</span>.
            </h2>
            <h3 className="ty__text">
                Tego dnia otrzymasz swój zindywidualizowany plan żywieniowy.
            </h3>

            <div className="ty__buttons flex">
                <a href="/" className="btn center btn--ty btn--ty--1">
                    Strona główna
                </a>
                <a href="/" className="btn center btn--ty btn--ty--2">
                    Przejrzyj inne plany
                </a>
            </div>
        </main>

        <Footer />
    </div>
};

export default TyPage;
