import React from 'react';
import SiteHeader from "../../components/shop/SiteHeader";
import AboutUs from "../../components/shop/AboutUs";
import ProblemsSection from "../../components/shop/ProblemsSection";
import Footer from "../../components/shop/Footer";

const AboutUsPage = () => {
    return <div className="container container--aboutUs">
        <SiteHeader />
        <AboutUs />
        <ProblemsSection />
        <Footer />
    </div>
};

export default AboutUsPage;
