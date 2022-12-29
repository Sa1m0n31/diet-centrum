import React, {useContext} from 'react';
import manImage from '../../static/img/man.png'
import {socialMedia} from "../../helpers/shop/content";
import {ContentContext} from "../../App";

const AboutUs = () => {
    const { c } = useContext(ContentContext);

    return c ? <div className="section section--aboutUs w">
        <h2 className="section__header">
            O mnie
        </h2>
        <div className="aboutUs__box">
            <figure className="aboutUs__box__image">
                <img className="img" src={manImage} alt="diet-centrum" />
            </figure>
            <h3 className="aboutUs__box__header">
                {c.aboutMeHeader.split(' ').slice(0, -1).join(' ')} <span className="green">{c.aboutMeHeader.split(' ').slice(-1)}</span>
            </h3>
            <p className="aboutUs__box__text">
                {c.aboutMeText}
            </p>
            <a href="/o-nas" className="btn btn--aboutUsBox d-desktop">
                Przeczytaj o nas więcej
            </a>

            <div className="aboutUs__box__socialMedia">
                <span className="aboutUs__box__socialMedia__header">
                    Nasze social media:
                </span>
                {socialMedia.map((item, index) => {
                    return <a href={item.link}
                              key={index}
                              rel="noreferrer"
                              className="aboutUs__box__socialMedia__link">
                        <img className="img" src={item.icon} alt="social-media" />
                    </a>
                })}
            </div>
        </div>
    </div> : '';
};

export default AboutUs;
