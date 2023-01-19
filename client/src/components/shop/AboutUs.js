import React, {useContext} from 'react';
import manImage from '../../static/img/man.png'
import {ContentContext} from "../../App";
import facebookIcon from '../../static/img/facebook.svg'
import instagramIcon from '../../static/img/instagram.svg'

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
                {c.aboutMeHeader.split(' ').slice(0, -2).join(' ')} <span className="green">{c.aboutMeHeader.split(' ').slice(-2).join(' ')}</span>
            </h3>
            <p className="aboutUs__box__text">
                {c.aboutMeText}
            </p>

            <div className="aboutUs__box__socialMedia">
                <span className="aboutUs__box__socialMedia__header">
                    Nasze social media:
                </span>
                <a href={c.facebook}
                   rel="noreferrer"
                   className="aboutUs__box__socialMedia__link">
                    <img className="img" src={facebookIcon} alt="social-media" />
                </a>
                <a href={c.instagram}
                   rel="noreferrer"
                   className="aboutUs__box__socialMedia__link">
                    <img className="img" src={instagramIcon} alt="social-media" />
                </a>
            </div>
        </div>
    </div> : '';
};

export default AboutUs;
