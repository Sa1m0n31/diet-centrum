import React from 'react';

const BeforeFooterSection = () => {
    return <div className="section section--beforeFooter">
        <h3 className="beforeFooter__header">
            Rozpoznij swoją przemianę już dziś!
        </h3>
        <h4 className="beforeFooter__subheader">
            Przejdź do <a href="/oferta">sklepu</a> lub wypełnij <a href="/kontakt">formularz kontaktowy</a>
             i umów się na konsultację dietetyczną.
        </h4>
        <a className="btn btn--beforeFooter center" href="/oferta">
            Chcę profesjonalny plan żywieniowy
        </a>
    </div>
};

export default BeforeFooterSection;
