import React from 'react';
import SiteHeader from "../../components/shop/SiteHeader";
import ContactForm from "../../components/shop/ContactForm";
import ContactData from "../../components/shop/ContactData";
import Footer from "../../components/shop/Footer";

const Contact = () => {
    return <div className="container container--contact">
        <SiteHeader />
        <main className="contact w flex">
            <ContactForm />
            <ContactData />
        </main>
        <Footer />
    </div>
};

export default Contact;
