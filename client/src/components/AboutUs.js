import React from 'react';
import manImage from '../static/img/man.png'
import {socialMedia} from "../helpers/content";

const AboutUs = () => {
    return <div className="section section--aboutUs w">
        <h2 className="section__header">
            O nas
        </h2>
        <div className="aboutUs__box">
            <figure className="aboutUs__box__image">
                <img className="img" src={manImage} alt="diet-centrum" />
            </figure>
            <h3 className="aboutUs__box__header">
                Jesteśmy świetnymi <span className="green">dietetykami</span>
            </h3>
            <p className="aboutUs__box__text">
                Z pasji i wykształcenia jestem dietetykiem klinicznym z Limanowej, absolwentką Krakowskiej Wyższej Szkoły Promocji Zdrowia. Moja praca dyplomowa o żywieniu w chorobach zapalnych jelit utwierdziła mnie w przekonaniu, że żywienie chorobach przewlekłych i chorobach jelit, to moja droga. Wciąż głodna wiedzy nieustannie aktualizuję ją na kursach i uczestnicząc w konferencjach.
            </p>
            <a href="/o-nas" className="btn btn--aboutUsBox">
                Przeczytaj o nas więcej
            </a>

            <div className="aboutUs__box__socialMedia">
                <span className="aboutUs__box__socialMedia__header">
                    Nasze social media:
                </span>
                {socialMedia.map((item, index) => {
                    return <a href={item.link}
                              rel="noreferrer"
                              className="aboutUs__box__socialMedia__link">
                        <img className="img" src={item.icon} alt="social-media" />
                    </a>
                })}
            </div>
        </div>
    </div>
};

export default AboutUs;
