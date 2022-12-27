import React from 'react';
import SiteHeader from "./SiteHeader";
import mainImage from '../../static/img/diet-centrum.png';
import {landingPageBenefits} from "../../helpers/shop/content";

const LandingPage = () => {
    return <div className="landing w">
        <SiteHeader homepage={true} />

        <div className="landing__main flex">
            <div className="landing__main__left">
                <h1 className="landing__header">
                    Postaw na zdrowie już <span className='green'>dzisiaj</span>
                </h1>
                <h2 className="landing__subheader">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
                </h2>
                <div className="landing__buttons flex">
                    <a className="btn btn--landing" href="/oferta">
                        Sprawdź ofertę
                    </a>
                    <a className="btn btn--landing btn--white" href="/o-nas">
                        Poznaj nas bliżej
                    </a>
                </div>
            </div>
            <figure className="landing__main__right d-desktop">
                <img className="img" src={mainImage} alt="diet-centrum-zdrowe-odzywanianie" />
            </figure>
        </div>

        <div className="landing__benefits flex d-desktop">
            {landingPageBenefits.map((item, index) => {
                return <div className="landing__benefits__item flex" key={index}>
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
};

export default LandingPage;
