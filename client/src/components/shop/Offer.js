import React, {useEffect, useRef, useState} from 'react';
import {getAllProducts} from "../../helpers/api/product";
import checkIcon from '../../static/img/check.svg';
import {offerColors} from "../../helpers/admin/content";

const Offer = () => {
    const [offerType, setOfferType] = useState(0);
    const [offerTypeSlug, setOfferTypeSlug] = useState('oferta-indywidualna');
    const [normalOffer, setNormalOffer] = useState([]);
    const [businessOffer, setBusinessOffer] = useState([]);
    const [offers, setOffers] = useState([]);

    let content = useRef(null);

    useEffect(() => {
        getAllProducts()
            .then((res) => {
                if(res?.data) {
                    const allOffers = res.data;
                    setNormalOffer(allOffers.filter((item) => (item.type === 0)));
                    setBusinessOffer(allOffers.filter((item) => (item.type === 1)));
                }
            });
    }, []);

    useEffect(() => {
        if(normalOffer && businessOffer) {
            content.current.style.opacity = '0';
            setTimeout(() => {
                if(offerType === 0) setOffers(normalOffer);
                else setOffers(businessOffer);

                setTimeout(() => {
                    content.current.style.opacity = '1';
                }, 150);
            }, 150);
        }
    }, [normalOffer, businessOffer, offerType]);

    useEffect(() => {
        if(offerType === 0) {
            setOfferTypeSlug('oferta-indywidualna');
        }
        else {
            setOfferTypeSlug('oferta-biznesowa');
        }
    }, [offerType]);

    return <div className="section section--offer">
        <h2 className="section__header">
            Oferta
        </h2>
        <div className="offer__types flex">
            <button className={offerType === 0 ? "offer__types__item offer__types__item--selected" : "offer__types__item"}
                    onClick={() => { setOfferType(0); }}>
                Indywidualna
            </button>
            <button className={offerType === 1 ? "offer__types__item offer__types__item--selected" : "offer__types__item"}
                    onClick={() => { setOfferType(1); }}>
                Biznesowa
            </button>
        </div>

        <div className="offer flex w" ref={content}>
            {offers.map((item, index) => {
                return <div className="offer__item"
                            style={{
                                background: offerColors[index%5]
                            }}
                            key={index}>
                    <h3 className="offer__item__title">
                        {item.title}
                    </h3>
                    <p className="offer__item__shortDescription">
                        {item.short_description}
                    </p>

                    <div className="offer__item__points">
                        <h4 className="offer__item__points__header">
                            Szczeg????y pakietu:
                        </h4>
                        <ul className="offer__item__points__list">
                            {JSON.parse(item.points).map((item, index) => {
                                return <li className="offer__item__points__list__item"
                                           key={index}>
                                    <img className="img" src={checkIcon} alt="zaleta" />
                                    <span>
                                        {item}
                                    </span>
                                </li>
                            })}
                        </ul>
                    </div>

                    <span className="offer__item__price">
                        {item.price} z??
                    </span>

                    <a className="offer__item__btn center"
                       href={`/produkt/${offerTypeSlug}/${item.slug}`}>
                        Szczeg????y planu
                    </a>
                </div>
            })}

            <div className="offer__item offer__item--special">
                <h3 className="offer__item__title">
                    Oferta dostosowana do potrzeb ka??dego Klienta.
                </h3>
                <p className="offer__item__shortDescription">
                    Wybieraj??c pe??n?? opiek?? dietetyka klinicznego online i wprowadzaj??c odpowiedni?? diet?? w nied??ugim czasie poczujesz zmian?? w samopoczuciu i zdrowiu.
                </p>
                <p className="offer__item__shortDescription">
                    Dorzu?? nieco wi??cej snu, relaksu i zadbaj o siebie ju?? dzi??.
                </p>

                <a className="offer__item__btn center"
                   href='/kontakt'>
                    Um??w si?? na konsultacj??
                </a>
            </div>
        </div>
    </div>
};

export default Offer;
