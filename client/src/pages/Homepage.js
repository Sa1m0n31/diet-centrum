import React from 'react';
import LandingPage from "../components/LandingPage";
import AboutUs from "../components/AboutUs";
import Offer from "../components/Offer";
import References from "../components/References";
import CooperationProcess from "../components/CooperationProcess";
import BeforeFooterSection from "../components/BeforeFooterSection";
import Footer from "../components/Footer";

const Homepage = () => {
    return <div className="container container--homepage">
        <LandingPage />
        <AboutUs />
        <Offer />
        <References />
        <CooperationProcess />
        <BeforeFooterSection />
        <Footer />
    </div>
};

export default Homepage;
