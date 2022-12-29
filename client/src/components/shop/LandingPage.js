import React, {useContext} from 'react';
import SiteHeader from "./SiteHeader";
import mainImage from '../../static/img/diet-centrum.png';
import {landingPageBenefits} from "../../helpers/shop/content";
import {ContentContext} from "../../App";

const LandingPage = () => {
    const { c } = useContext(ContentContext);

    return c ? <div className="landing w">
        <SiteHeader homepage={true} />

        <div className="landing__main flex">
            <div className="landing__main__left">
                <h1 className="landing__header">
                    {c.landingHeader.split(' ').slice(0, -1).join(' ')} <span className='green'>{c.landingHeader.split(' ').slice(-1)}</span>
                </h1>
                <h2 className="landing__subheader">
                    {c.landingSubheader}
                </h2>
                <div className="landing__buttons flex">
                    <a className="btn btn--landing" href={c.landingBtn1Link}>
                        {c.landingBtn1Text}
                    </a>
                    <a className="btn btn--landing btn--white" href={c.landingBtn2Link}>
                        {c.landingBtn2Text}
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
    </div> : '';
};

export default LandingPage;
