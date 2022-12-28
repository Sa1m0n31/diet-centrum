import React, {useContext, useEffect, useState} from 'react';
import nextArrow from '../../static/img/arrow-white.svg';
import {OrderContext} from "../../pages/shop/OrderProcess";
import {isEmail, scrollToTop} from "../../helpers/api/others";

const OrderStep1 = () => {
    const { userData, setUserData, invoice, setInvoice,
        invoiceData, setInvoiceData, paperVersion, setPaperVersion, setStep } = useContext(OrderContext);

    const [errors, setErrors] = useState([]);

    const handleChange = (key, target) => {
        if(target) {
            setErrors(prevState => (prevState.filter((item) => (item !== `${key}User`))));
        }

        setUserData(prevState => ({
            ...prevState,
            [key]: target
        }));
    }

    const handleChangeInvoice = (key, target) => {
        if(target) {
            setErrors(prevState => (prevState.filter((item) => (item !== `${key}Invoice`))));
        }

        setInvoiceData(prevState => ({
            ...prevState,
            [key]: target
        }));
    }

    const validateData = () => {
        let err = [];

        if(!userData.firstName) err.push('firstNameUser');
        if(!userData.lastName) err.push('lastNameUser');
        if(!userData.street) err.push('streetUser');
        if(!userData.building) err.push('buildingUser');
        if(!userData.postalCode) err.push('postalCodeUser');
        if(!userData.city) err.push('cityUser');
        if(!userData.phoneNumber) err.push('phoneNumberUser');
        if(!isEmail(userData.email)) err.push('emailUser');

        if(invoice) {
            if(!invoiceData.companyName) err.push('companyNameInvoice');
            if(!invoiceData.street) err.push('streetInvoice');
            if(!invoiceData.building) err.push('buildingInvoice');
            if(!invoiceData.postalCode) err.push('postalCodeInvoice');
            if(!invoiceData.city) err.push('cityInvoice');
            if(!invoiceData.nip) err.push('nipInvoice');
        }

        setErrors(err);
        return err.length === 0;
    }

    const nextStep = () => {
        if(validateData()) {
            setStep(1);
        }
        else {
            scrollToTop();
        }
    }

    return <main className="order order--1">
        <h1 className="order__header">
            1. Uzupełnij dane
        </h1>

        <div className="flex flex--start">
            <label>
                Imię
                <input className={errors.includes('firstNameUser') ? "input input--order input--firstName input--error" : "input input--order input--firstName"}
                       value={userData.firstName}
                       onChange={(e) => { handleChange('firstName', e.target.value); }} />
            </label>
            <label>
                Nazwisko
                <input className={errors.includes('lastNameUser') ? "input input--order input--lastName input--error" : "input input--order input--lastName"}
                       value={userData.lastName}
                       onChange={(e) => { handleChange('lastName', e.target.value); }} />
            </label>
        </div>

        <div className="flex flex--start">
            <label>
                Ulica
                <input className={errors.includes('streetUser') ? "input input--order input--firstName input--error" : "input input--order input--firstName"}
                       value={userData.street}
                       onChange={(e) => { handleChange('street', e.target.value); }} />
            </label>
            <label>
                Nr domu
                <input className={errors.includes('buildingUser') ? "input input--order input--flat input--error" : "input input--order input--flat"}
                       value={userData.building}
                       onChange={(e) => { handleChange('building', e.target.value); }} />
            </label>
            <label>
                Nr lokalu
                <input className="input input--order input--flat"
                       value={userData.flat}
                       onChange={(e) => { handleChange('flat', e.target.value); }} />
            </label>
        </div>

        <div className="flex flex--start">
            <label>
                Kod pocztowy
                <input className={errors.includes('postalCodeUser') ? "input input--order input--postalCode input--error" : "input input--order input--postalCode"}
                       value={userData.postalCode}
                       onChange={(e) => { handleChange('postalCode', e.target.value); }} />
            </label>
            <label>
                Miejscowość
                <input className={errors.includes('cityUser') ? "input input--order input--city input--error" : "input input--order input--city"}
                       value={userData.city}
                       onChange={(e) => { handleChange('city', e.target.value); }} />
            </label>
        </div>

        <div className="flex flex--start">
            <label>
                Nr telefonu
                <input className={errors.includes('phoneNumberUser') ? "input input--order input--phoneNumber input--error" : "input input--order input--phoneNumber"}
                       value={userData.phoneNumber}
                       onChange={(e) => { handleChange('phoneNumber', e.target.value); }} />
            </label>
            <label>
                Adres e-mail
                <input className={errors.includes('emailUser') ? "input input--order input--email input--error" : "input input--order input--email"}
                       value={userData.email}
                       onChange={(e) => { handleChange('email', e.target.value); }} />
            </label>
        </div>

        <div className="checkboxWrapper">
            <h5 className="checkboxWrapper__header">
                Faktura VAT
            </h5>
            <label className={invoice ? "adminSelect adminSelect--order flex flex--start" : "flex flex--start"}>
                <button className="btn btn--adminSelect btn--adminSelect--order" onClick={() => { setInvoice(p => !p); }}>

                </button>
                Faktura VAT
            </label>
        </div>

        {invoice ? <div className="invoiceData">
            <div className="flex flex--start">
                <label>
                    Nazwa firmy
                    <input className={errors.includes('companyNameInvoice') ? "input input--order input--companyName input--error" : "input input--order input--companyName"}
                           value={invoiceData.firstName}
                           onChange={(e) => { handleChangeInvoice('companyName', e.target.value); }} />
                </label>
            </div>

            <div className="flex flex--start">
                <label>
                    Ulica
                    <input className={errors.includes('streetInvoice') ? "input input--order input--firstName input--error" : "input input--order input--firstName"}
                           value={invoiceData.street}
                           onChange={(e) => { handleChangeInvoice('street', e.target.value); }} />
                </label>
                <label>
                    Nr domu
                    <input className={errors.includes('buildingInvoice') ? "input input--order input--flat input--error" : "input input--order input--flat"}
                           value={invoiceData.building}
                           onChange={(e) => { handleChangeInvoice('building', e.target.value); }} />
                </label>
                <label>
                    Nr lokalu
                    <input className="input input--order input--flat"
                           value={invoiceData.flat}
                           onChange={(e) => { handleChangeInvoice('flat', e.target.value); }} />
                </label>
            </div>

            <div className="flex flex--start">
                <label>
                    Kod pocztowy
                    <input className={errors.includes('postalCodeInvoice') ? "input input--order input--postalCode input--error" : "input input--order input--postalCode"}
                           value={invoiceData.postalCode}
                           onChange={(e) => { handleChangeInvoice('postalCode', e.target.value); }} />
                </label>
                <label>
                    Miejscowość
                    <input className={errors.includes('cityInvoice') ? "input input--order input--city input--error" : "input input--order input--city"}
                           value={invoiceData.city}
                           onChange={(e) => { handleChangeInvoice('city', e.target.value); }} />
                </label>
            </div>

            <div className="flex flex--start">
                <label>
                    NIP
                    <input className={errors.includes('nipInvoice') ? "input input--order input--nip input--error" : "input input--order input--nip"}
                           value={invoiceData.nip}
                           onChange={(e) => { handleChangeInvoice('nip', e.target.value); }} />
                </label>
            </div>
        </div> : ''}

        <div className="checkboxWrapper">
            <h5 className="checkboxWrapper__header">
                Wersja papierowa
            </h5>
            <label className={paperVersion ? "adminSelect adminSelect--order flex flex--start" : "flex flex--start"}>
                <button className="btn btn--adminSelect btn--adminSelect--order" onClick={() => { setPaperVersion(p => !p); }}>

                </button>
                Wybieram wersję papierową planu (+5.00 zł)
            </label>
        </div>

        <div className="cart__bottom cart__bottom--order flex">
            <button className="btn btn--goToCart"
                    onClick={() => { nextStep(); }}>
                Przejdź dalej
                <img className="img" src={nextArrow} alt="dalej" />
            </button>
        </div>
    </main>
};

export default OrderStep1;
