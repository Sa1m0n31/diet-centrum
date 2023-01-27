import React, {useContext, useRef} from 'react';
import logo from '../../static/img/logo.png';
import logoMobile from '../../static/img/logo-footer.png';
import menuIcon from '../../static/img/menu-mobile.svg';
import phoneIcon from '../../static/img/phone.svg';
import cartIcon from '../../static/img/shopping-basket.svg';
import backIcon from '../../static/img/arrow-back.svg';
import mailIcon from '../../static/img/mail.svg';
import {ContentContext} from "../../App";

const SiteHeader = ({homepage, breadcrumb}) => {
    const { c } = useContext(ContentContext);

    let mobileMenu = useRef(null);

    const openMenu = () => {
        const mobileMenuChildren = Array.from(document.querySelectorAll('.mobileMenu > *'));

        mobileMenu.current.style.transform = 'scaleX(1)';
        setTimeout(() => {
            mobileMenuChildren.forEach((item) => { item.style.opacity = '1'; });
        }, 150);
    }

    const closeMenu = () => {
        const mobileMenuChildren = Array.from(document.querySelectorAll('.mobileMenu > *'));

        mobileMenuChildren.forEach((item) => { item.style.opacity = '0'; });
        setTimeout(() => {
            mobileMenu.current.style.transform = 'scaleX(0)';
        }, 150);
    }

    return <header className={homepage ? "siteHeader" : "siteHeader w"}>
        {/* MOBILE MENU */}
        <div className="mobileMenu d-mobile" ref={mobileMenu}>
            <img className="img" src={logoMobile} alt="diet-centrum" />

            <ul className="siteHeader__menu">
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

            <span className="siteHeader__contact flex">
                <span>
                    Skontaktuj się z nami:
                </span>
                <a className="siteHeader__contact__link"
                   href={`tel:${c?.phoneNumber?.replace(' ', '')}`}>
                    <img className="img" src={phoneIcon} alt="telefon" />
                    {c.phoneNumber}
                </a>
                <a className="siteHeader__contact__link"
                   href={`mailto:${c.email}`}>
                    <img className="img" src={mailIcon} alt="telefon" />
                    {c.email}
                </a>
            </span>

            <div className="mobileMenu__bottom flex">
                <button className="mobileMenu__bottom__closeMenu"
                        onClick={() => { closeMenu(); }}>
                    <img className="img" src={backIcon} alt="cofnij" />
                </button>

                <a href="/koszyk" className="mobileMenu__bottom__closeMenu">
                    <img className="img" src={cartIcon} alt="koszyk" />
                </a>
            </div>
        </div>

        {/* DESKTOP */}
        <span className="siteHeader__contact flex d-desktop">
            <span className="flex flex--start">
                <img className="img" src={phoneIcon} alt="telefon" />
                 <a className="siteHeader__contact__link"
                    href={`tel:${c?.phoneNumber?.replace(' ', '')}`}>
                    {c.phoneNumber}
                </a>
            </span>
            <span className="flex flex--start">
                <img className="img" src={mailIcon} alt="mail" />
                <a className="siteHeader__contact__link"
                   href={`mailto:${c?.email}`}>
                    {c.email}
                </a>
            </span>
        </span>

        <div className="siteHeader__main flex d-desktop">
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

        {breadcrumb ? <div className="breadcrumb d-desktop">
            {breadcrumb.map((item, index) => {
                return <p key={index}>
                    {item}
                </p>
            })}
        </div> : ''}

        {/* MOBILE */}
        <a href="/" className="siteHeader__mobileLogo d-mobile">
            <img className="img" src={logoMobile} alt="diet-centrum" />
        </a>

        <div className="siteHeader__mobileBar d-mobile flex">
            <button className="siteHeader__mobileBar__btn center"
                    onClick={() => { openMenu(); }}>
                <img className="img" src={menuIcon} alt="menu" />
            </button>

            <a href="/koszyk" className="siteHeader__mobileBar__btn center">
                <img className="img" src={cartIcon} alt="koszyk" />
            </a>
        </div>
    </header>
};

export default SiteHeader;
