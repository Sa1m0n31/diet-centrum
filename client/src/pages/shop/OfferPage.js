import React from 'react';
import SiteHeader from "../../components/shop/SiteHeader";
import Footer from "../../components/shop/Footer";
import Offer from "../../components/shop/Offer";

const OfferPage = () => {
    return <div className="container container--offer">
        <SiteHeader />
        <Offer />
        <Footer />
    </div>
};

export default OfferPage;
