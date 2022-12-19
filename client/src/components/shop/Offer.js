import React, {useState} from 'react';

const Offer = () => {
    const [offerType, setOfferType] = useState(0);

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
    </div>
};

export default Offer;
