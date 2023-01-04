import React from 'react';
import SiteHeader from "../../components/shop/SiteHeader";
import AboutUs from "../../components/shop/AboutUs";
import ProblemsSection from "../../components/shop/ProblemsSection";
import Footer from "../../components/shop/Footer";
import CooperationProcess from "../../components/shop/CooperationProcess";

const AboutUsPage = () => {
    return <div className="container container--aboutUs">
        <SiteHeader />
        <AboutUs />
        <ProblemsSection />
        <CooperationProcess />
        <Footer />
    </div>
};

export default AboutUsPage;
