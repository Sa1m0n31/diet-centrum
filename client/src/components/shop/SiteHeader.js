import React, {useContext} from 'react';
import logo from '../../static/img/logo.png'
import phoneIcon from '../../static/img/phone.svg'
import cartIcon from '../../static/img/shopping-basket.svg'
import {ContentContext} from "../../App";

const SiteHeader = ({homepage}) => {
    const { c } = useContext(ContentContext);

    return <header className={homepage ? "siteHeader" : "siteHeader w"}>
        <span className="siteHeader__contact flex">
            <img className="img" src={phoneIcon} alt="telefon" />
            <span>
                Skontaktuj się z nami:
            </span>
            <a className="siteHeader__contact__link"
               href={`tel:${c?.phoneNumber?.replace(' ', '')}`}>
                {c.phoneNumber}
            </a>
        </span>

        <div className="siteHeader__main flex">
            <a className="siteHeader__logo" href="/">
                <img className="img" src={logo} alt="diet-centrum-logo" />
            </a>

            <div className="siteHeader__main__right flex">
                <ul className="siteHeader__menu flex">
                    <li className="siteHeader__menu__item">
                        <a className="siteHeader__menu__item__link" href="/">
                            Home
                        </a>
                    </li>
                    <li className="siteHeader__menu__item">
                        <a className="siteHeader__menu__item__link" href="/o-nas">
                            O nas
                        </a>
                    </li>
                    <li className="siteHeader__menu__item">
                        <a className="siteHeader__menu__item__link" href="/oferta">
                            Oferta
                        </a>
                    </li>
                    <li className="siteHeader__menu__item">
                        <a className="siteHeader__menu__item__link" href="/blog">
                            Blog
                        </a>
                    </li>
                    <li className="siteHeader__menu__item">
                        <a className="siteHeader__menu__item__link" href="/kontakt">
                            Kontakt
                        </a>
                    </li>
                </ul>

                <a className="siteHeader__cart" href="/koszyk">
                    <img className="img" src={cartIcon} alt="koszyk" /> Koszyk
                </a>
            </div>
        </div>
    </header>
};

export default SiteHeader;
