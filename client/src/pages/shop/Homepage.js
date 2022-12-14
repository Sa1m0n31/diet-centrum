import React from 'react';
import LandingPage from "../../components/shop/LandingPage";
import AboutUs from "../../components/shop/AboutUs";
import Offer from "../../components/shop/Offer";
import References from "../../components/shop/References";
import CooperationProcess from "../../components/shop/CooperationProcess";
import BeforeFooterSection from "../../components/shop/BeforeFooterSection";
import Footer from "../../components/shop/Footer";
import ProblemsSection from "../../components/shop/ProblemsSection";

const Homepage = () => {
    return <div className="container container--homepage">
        <LandingPage />
        <AboutUs />
        <ProblemsSection />
        <Offer />
        <References />
        <CooperationProcess />
        <BeforeFooterSection />
        <Footer />
    </div>
};

export default Homepage;
