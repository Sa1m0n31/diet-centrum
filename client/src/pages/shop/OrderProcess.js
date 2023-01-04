import React, {useEffect, useRef, useState} from 'react';
import SiteHeader from "../../components/shop/SiteHeader";
import Footer from "../../components/shop/Footer";
import OrderStep1 from "../../components/shop/OrderStep1";
import OrderStep2 from "../../components/shop/OrderStep2";
import OrderStep3 from "../../components/shop/OrderStep3";
import {scrollToTop} from "../../helpers/api/others";

const OrderContext = React.createContext(null);

const OrderProcess = () => {
    const [step, setStep] = useState(0);
    const [mainComponent, setMainComponent] = useState(<OrderStep1 />);

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        street: '',
        building: '',
        flat: '',
        postalCode: '',
        city: '',
        phoneNumber: '',
        email: ''
    });
    const [datePrice, setDatePrice] = useState(0);
    const [paperVersion, setPaperVersion] = useState(false);
    const [invoice, setInvoice] = useState(false);
    const [invoiceData, setInvoiceData] = useState({
        companyName: '',
        street: '',
        building: '',
        flat: '',
        postalCode: '',
        city: '',
        nip: ''
    });
    const [day, setDay] = useState(null);
    const [attachment, setAttachment] = useState(null);
    const [email, setEmail] = useState('');

    let content = useRef(null);

    useEffect(() => {
        if(content?.current) {
            scrollToTop();
            content.current.style.opacity = '0';

            setTimeout(() => {
                if(step === 0) {
                    setMainComponent(<OrderStep1 />);
                }
                else if(step === 1) {
                    setMainComponent(<OrderStep2 />);
                }
                else {
                    setMainComponent(<OrderStep3 />);
                }

                setTimeout(() => {
                    if(content.current) {
                        content.current.style.opacity = '1';
                    }
                }, 200);
            }, 200);
        }
    }, [step]);

    return <div className="container container--order">
        <SiteHeader />

        <div className="orderWrapper w" ref={content}>
            <OrderContext.Provider value={{
                userData, setUserData,
                invoiceData, setInvoiceData,
                invoice, setInvoice,
                datePrice, setDatePrice,
                paperVersion, setPaperVersion,
                setStep,
                day, setDay,
                attachment, setAttachment,
                email, setEmail
            }}>
                {mainComponent}
            </OrderContext.Provider>
        </div>

        <Footer />
    </div>
};

export default OrderProcess;
export { OrderContext }
