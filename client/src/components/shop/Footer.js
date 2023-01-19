import React, {useContext} from 'react';
import logo from '../../static/img/logo-footer.png';
import phoneIcon from '../../static/img/phone.svg';
import mailIcon from '../../static/img/mail.svg';
import {ContentContext} from "../../App";
import facebookIcon from '../../static/img/facebook.svg'
import instagramIcon from '../../static/img/instagram.svg'

const Footer = () => {
    const { c } = useContext(ContentContext);

    return <footer className="footer w">
        <div className="footer__main flex">
            <div className="footer__col footer__col--first">
                <a href="/" className="footer__col__logoWrapper">
                    <img className="img" src={logo} alt="diet-centrum" />
                </a>
                <p className="footer__col__text">
                    {c.footerText}
                </p>
                <div className="footer__col__socialMedia flex">
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

            <div className="footer__col">
                <h4 className="footer__col__header">
                    Nawigacja
                </h4>

                <a className="footer__col__link" href="/">Strona główna</a>
                <a className="footer__col__link" href="/o-nas">O nas</a>
                <a className="footer__col__link" href="/oferta">Sklep</a>
                <a className="footer__col__link" href="/koszyk">Koszyk</a>
                <a className="footer__col__link" href="/kontakt">Kontakt</a>
            </div>

            <div className="footer__col">
                <h4 className="footer__col__header">
                    Linki
                </h4>

                <a className="footer__col__link" href="/regulamin">Regulamin</a>
                <a className="footer__col__link" href="/polityka-prywatnosci">Polityka prywatności</a>
            </div>

            <div className="footer__col">
                <h4 className="footer__col__header">
                    Kontakt
                </h4>

                <span className="footer__col__contact">
                    <img className="img" src={phoneIcon} alt="telefon" />
                    {c.phoneNumber}
                </span>
                <span className="footer__col__contact">
                    <img className="img" src={mailIcon} alt="email" />
                    {c.email}
                </span>
            </div>
        </div>
        <aside className="footer__bottom">
            <h5>
                &copy; {new Date().getFullYear()} DietCentrum.pl
            </h5>
            <h6>
                Wykonanie <a href="https://skylo.pl" rel="noreferrer" target="_blank">Skylo.pl</a>
            </h6>
        </aside>
    </footer>
};

export default Footer;
