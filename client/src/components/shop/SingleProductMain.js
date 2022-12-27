import React from 'react';
import {API_URL} from "../../static/settings";
import checkIcon from "../../static/img/check.svg";
import {landingPageBenefits} from "../../helpers/shop/content";
import draftToHtml from "draftjs-to-html";

const SingleProductMain = ({product, addToCart}) => {
    return <main className="singleProduct w flex">
        <figure className="singleProduct__image">
            <img className="img" src={`${API_URL}/${product.image}`} alt={product.title} />
        </figure>
        <div className="singleProduct__mainContent">
            <h1 className="singleProduct__title">
                {product.title}
            </h1>
            <p className="singleProduct__shortDescription">
                {product.short_description}
            </p>

            <h2 className="singleProduct__price">
                {product.price} zł
            </h2>
            <button className="btn btn--addToCart"
                    onClick={addToCart}>
                Dodaj do koszyka
            </button>

            <div className="offer__item__points">
                <h3 className="offer__item__points__header">
                    Szczegóły pakietu:
                </h3>
                <ul className="offer__item__points__list">
                    {product.points ? JSON.parse(product.points).map((item, index) => {
                        return <li className="offer__item__points__list__item"
                                   key={index}>
                            <img className="img" src={checkIcon} alt="zaleta" />
                            <span>
                                {item}
                            </span>
                        </li>
                    }) : ''}
                </ul>
            </div>

            <div className="landing__benefits flex d-desktop">
                {landingPageBenefits.map((item, index) => {
                    return <div className="landing__benefits__item flex"
                                key={index}>
                        <img className="img" src={item.icon} alt={item.header} />
                        <div className="landing__benefits__item__content">
                            <h3 className="landing__benefits__item__content__header">
                                {item.header}
                            </h3>
                            <h4 className="landing__benefits__item__content__subheader">
                                {item.subheader}
                            </h4>
                        </div>
                    </div>
                })}
            </div>
        </div>

        <div className="singleProduct__longDescription">
            <h4 className="singleProduct__longDescription__header">
                Opis planu
            </h4>

            {product.long_description ? <article className="singleProduct__longDescription__content"
                                                 dangerouslySetInnerHTML={{
                                                     __html: draftToHtml(JSON.parse(product.long_description))
                                                 }}>

            </article> : ''}
        </div>
    </main>
};

export default SingleProductMain;
