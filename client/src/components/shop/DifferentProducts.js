import React, {useEffect, useState} from 'react';
import {getAllProducts} from "../../helpers/api/product";
import {offerColors} from "../../helpers/admin/content";

const DifferentProducts = ({offerType, excludedOffer}) => {
    const [offers, setOffers] = useState([]);
    const [offerTypeSlug, setOfferTypeSlug] = useState('oferta-indywidualna');

    useEffect(() => {
        if(excludedOffer && offerType !== undefined) {
            getAllProducts()
                .then((res) => {
                    if(res?.status === 200) {
                        setOffers(res.data.filter((item) => {
                            return (item.id !== excludedOffer) && (item.type === offerType);
                        }));
                    }
                });
        }
    }, [excludedOffer, offerType]);

    useEffect(() => {
        if(offerType === 0) {
            setOfferTypeSlug('oferta-indywidualna');
        }
        else {
            setOfferTypeSlug('oferta-biznesowa');
        }
    }, [offerType]);

    return <div className="differentProductsWrapper w">
        <h3 className="section__header">
            Zobacz inne plany
        </h3>

        <div className="differentProducts flex">
            {offers.map((item, index) => {
                return <div className="differentProducts__item"
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

                    <span className="offer__item__price">
                        {item.price} zł
                    </span>

                    <a className="offer__item__btn center"
                       href={`/produkt/${offerTypeSlug}/${item.slug}`}>
                        Szczegóły planu
                    </a>
                </div>
            })}
        </div>
    </div>
};

export default DifferentProducts;
